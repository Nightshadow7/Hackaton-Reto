const checkUserRole = (allowedRoles) => {
    return (req, res, next) => {
      const { rol } = req.user;
  
      if (!allowedRoles.includes(rol)) { 
        return res.status(403).json({ error: 'No tienes permiso para realizar esta acción como entidad.' });
      }
  
      return next();
    };
  };
  
  export default checkUserRole;

  

  
