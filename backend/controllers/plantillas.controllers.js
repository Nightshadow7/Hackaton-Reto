import Formulario from '../models/form.js';
import FormularioTemporal from '../models/formdupli.js';

const addFormulario = async (req, res) => {
  try {
    const { nombre, campos } = req.body;

    const camposTransformados = campos.map(campo => {
      const tipo = campo.tipo.toLowerCase();
      return {
        titulo: campo.titulo,
        tipo: tipo === 'texto' ? 'text' : tipo === 'número' ? 'number' : 'text',
        requerido: campo.requerido,
      };
    });

    const newForm = new Formulario({ nombre, campos: camposTransformados });
    await newForm.save();

    res.json(newForm);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo agregar el formulario.' });
  }
}

const getAllFormularios = async (req, res) => {
  try {
    const forms = await Formulario.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: 'No se pudieron recuperar los formularios.' });
  }
}

const deleteFormulario = async (req, res) => {
  try {
    const { id } = req.params;
    await Formulario.findByIdAndRemove(id);
    res.json({ message: 'Formulario eliminado exitosamente.' });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo eliminar el formulario.' });
  }
}

const duplicarFormulario = async (req, res) => {
  try {
    const { id } = req.params;
    const formulario = await Formulario.findById(id);

    if (!formulario) {
      return res.status(404).json({ error: 'Formulario no encontrado.' });
    }

    const camposDuplicados = formulario.campos.map(campo => ({
      titulo: campo.titulo,
      tipo: campo.tipo,
      requerido: campo.requerido,
    }));

    const newFormTemporal = new FormularioTemporal({
      nombre: `Copia de ${formulario.nombre}`,
      campos: camposDuplicados,
    });

    await newFormTemporal.save();

    res.json(newFormTemporal);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo duplicar el formulario.' });
  }
}

const actualizarFormularioTemporal = async (req, res) => {
  try {
    const { id } = req.params;
    const formularioTemporal = await FormularioTemporal.findById(id);

    if (!formularioTemporal) {
      return res.status(404).json({ error: 'Formulario temporal no encontrado.' });
    }

    formularioTemporal.nombre = req.body.nombre;
    formularioTemporal.campos = req.body.campos;

    await formularioTemporal.save();
    res.json(formularioTemporal);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo actualizar el formulario temporal.' });
  }
}

export default {
  addFormulario,
  getAllFormularios,
  deleteFormulario,
  duplicarFormulario,
  actualizarFormularioTemporal,
};
