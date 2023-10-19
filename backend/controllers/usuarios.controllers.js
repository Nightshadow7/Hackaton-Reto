import boom from "@hapi/boom";
import Usuario from "../models/Usuarios.js";
import Form from "../models/form.js";
import { db } from "../config/mongoClient.js";
import { ObjectId } from "mongodb";
import generateRandomNumber from "../middlewares/saldoValidator.js";


const usuarios = db.collection("usuarios");

export const getAll = async (req, res, next) => {
  try {
    const data = await usuarios.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const oid = req.params.id;
    const User = await Usuario.findById({ _id: oid });
    if (!User)
      throw boom.notFound("Usuario ID no encontrado en la base de datos");
    res.status(200).json(User);
  } catch (err) {
    next(err);
  }
};

export const createUsuario = async (req, res, next) => {
  try {
    const { password, numeroDocumento, correo, ...remaining } = req.body;
    const [UsuarioDB, correoDB] = await Promise.all([
      Usuario.findOne({ numeroDocumento }),
      Usuario.findOne({ correo }),
    ]);
    if (UsuarioDB || correoDB) {
      throw boom.badRequest(
        "El Documento ó el correo electronico ya poseen una cuenta asociada "
      );
    }
    const newUser = new Usuario({
      password: Usuario.encryptPassword(password),
      numeroDocumento,
      correo,
      ...remaining,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const createCuentaAhorros = async (req, res, next) => {
  try {
    const oid = new ObjectId(req.params.id);
    const User = await Usuario.findById({ _id: req.params.id });
    if (!User)
      throw boom.notFound("Usuario ID no encontrado en la base de datos");
    if (!User.estado) {
      throw boom.badRequest(
        "El Usuario se encuentra Bloqueado. Favor contactar con soporte."
      );
    }
    const data = req.body.cuentasAhorro || [];
    const createdAccounts = [];
    for (const account of data) {
      let number = account.numeroCuenta
        ? account.numeroCuenta
        : generateRandomNumber();
      //const number = generateRandomNumber();
      const saldo = account.saldo < 1 ? 200000 : account.saldo;
      const newAccount = {
        numeroCuenta: number,
        saldo,
      };
      // User.cuentasAhorro.push(newAccount);
      createdAccounts.push(newAccount);
    }
    console.log(createdAccounts);

    const actualizado = await Usuario.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          cuentasAhorro: {
            $each: [...createdAccounts],
          },
        },
      },
      { new: true }
    );

    res.status(200).json(actualizado);
  } catch (err) {
    next(err);
  }
};

// export const Image = async (req, res, next) => {
//   try {
//     const oid = req.params.id;
//     const existeUser = await usuarios.findOne({ _id: oid });
//     if (!existeUser) {
//       throw boom.notFound("Usuario ID no encontrado en la base de datos");
//     }
//     const file = req.file.qrs;
//     if (!file) {
//       const data = await Usuario.findOneAndUpdate(
//         { _id: req.params.id },
//         { imagen: imagenDefault },
//         { new: true }
//       );
//       res.status(200).json({
//         message:
//           "No se mando archivo de imagen por lo tanto se cargo una por defecto",
//         data,
//       });
//     }
//     const ImageData = file.buffer;
//     const imageDataWithPrefix = `data:image/png;base64,${ImageData.toString(
//       "base64"
//     )}`;
//     const data = await Usuario.findOneAndUpdate(
//       { _id: req.params.id },
//       { imagen: imageDataWithPrefix },
//       { new: true }
//     );
//     res.status(200).json({
//       message: "Imagen de Usuario actualizada con éxito",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const createQR = async (req, res, next) => {
  try {
    const oid = req.params.id;
    let { precioDefault, nombre, descripcion, idCuentaAhorros, idFormulario } =
      req.body;

    const User = await Usuario.findById({ _id: oid });
    if (!User)
      throw boom.notFound("Usuario ID no encontrado en la base de datos");
    if (!User.estado) {
      throw boom.badRequest("El Usuario se encuentra Bloqueado ");
    }

/*     const existeCuenta = await Usuario.findById({
      _id: req.params.id,
      cuentasAhorro: { $elemMatch: { _id: idCuentaAhorros } },
    });

    if(!existeCuenta)
      throw boom.badData('ID Cuenta de Ahorros no coincide con usuario') */
    let formFields = await Form.find({ _id: idFormulario });
    const data = {
      nombre: User.nombre,
      numeroDocumento: User.numeroDocumento,
      tipoDocumento: User.tipoDocumento,
      precioDefault: precioDefault ? precioDefault : null,
      idCuentaAhorros,
      idFormulario,
      formFields,
    };

    const generateQR = async (text) => {
      try {
        return await QRCode.toDataURL(text);
      } catch (err) {
        console.error(err);
      }
    };

    const myQrCode = await generateQR(JSON.stringify(data));
    await Usuario.findOneAndUpdate(
      { _id: oid },
      {
        $push: {
          qrs: {
            singleQr: myQrCode,
            createdAt: new Date(),
            nombre,
            descripcion: descripcion ? descripcion : null
          },
        },
      },
      { new: true }
    );

    res.status(200).json({ result: existeCuenta });
    //const qr_image = qr.image(JSON.stringify(data), { type: "png" });
    /* 
    const backgroundImagePath = User.imagen;
    Jimp.read(backgroundImagePath, (err, background) => {
      if (err) throw err;

      const width = background.bitmap.width;
      const height = background.bitmap.height;

      Jimp.read(qr_image, (err, qr) => {
        if (err) throw err;

        const qrSize = 200;
        qr.resize(qrSize, qrSize);

        const x = (width - qrSize) / 2;
        const y = (height - qrSize) / 2;

        background.composite(qr, x, y);

        const qrFileName = "codigo_qr_con_fondo.png";
        background.write(qrFileName, () => {
          res.download(qrFileName);
        });
      });

    }); */
  } catch (error) {
    next(error);
  }
};

export const updateUsuario = async (req, res, next) => {
  try {
    const oid = req.params.id;
    const existeUser = await usuarios.findOne({ _id: oid });
    if (!existeUser)
      throw boom.notFound("Usuario ID no encontrado en la base de datos");

    const { password, numeroDocumento, correo, ...remaining } = req.body;
    const [UsuarioDB, correoDB] = await Promise.all([
      Usuario.findOne({ numeroDocumento }),
      Usuario.findOne({ correo }),
    ]);
    if (UsuarioDB || correoDB) {
      throw boom.badRequest(
        "El Documento ó el correo electronico ya poseen una cuenta asociada "
      );
    }
    if (password) {
      let newPassword = Usuario.encryptPassword(password);
      remaining["password"] = newPassword;
    }
    const updateUser = new Usuario({
      numeroDocumento,
      correo,
      ...remaining,
    });
    const updated = await Usuario.findOneAndUpdate(
      { _id: req.params.id },
      updateUser,
      { new: true }
    );
    res.status(200).json({ message: "Usuario actualizado con éxito", updated });
  } catch (err) {
    next(err);
  }
};

export const deleteUsuario = async (req, res, next) => {
  try {
    const deleted = await Usuario.findOneAndUpdate(
      { _id: req.params.id },
      { estado: false },
      { new: true }
    );
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};
export const procesarPago = async (req, res, next) => {
  try {
    const { cantidadAPagar, saldo, _id } = req.body;

    if (isNaN(cantidadAPagar) || parseFloat(cantidadAPagar) <= 0) {
      throw boom.badRequest("La cantidad a pagar debe ser mayor que cero.");
    }

    const oid = new ObjectId(_id);
    const user = await Usuario.findOne({ "cuentasAhorro._id": oid });

    if (!user) {
      throw boom.notFound("Usuario no encontrado");
    }

    const account = user.cuentasAhorro.find(
      (cuenta) => cuenta._id.equals(oid)
    );
    console.log(account);

    if (!account) {
      throw boom.notFound("Cuenta de ahorro no encontrada");
    }

    if (account.saldo < saldo) {
      throw boom.badRequest("Saldo insuficiente para realizar el pago.");
    }

    const newSaldo = account.saldo - cantidadAPagar;
    console.log(`
      saldo existente: ${account.saldo}
      saldo enviado: ${cantidadAPagar}
      saldo nuevo: ${newSaldo}
    `);
    //await user.save();
    console.log(account.saldo);
    const updated = await Usuario.update(
      {"cuentasAhorro.numeroCuenta": account.numeroCuenta},
      { $set: {"cuentasAhorro.$.saldo": newSaldo} }
    )
    console.log(updated);

    res.status(200).json({ message: "Pago procesado con éxito", user });
  } catch (error) {
    next(error);
  }
};