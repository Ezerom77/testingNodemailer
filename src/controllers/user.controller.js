const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const { getToken, getTokenData } = require("../config/jwt.config");
const { getTemplate, sendEmail } = require("../config/mail.config");

const signUp = async (req, res, next) => {
  try {
    //Obtener la data del usuario. (nombre y correo)
    const { name, email } = req.body;

   // Verificar que el usuario no exista
   let user = await User.findOne({ email }) || null;

   if(user !== null) {
       return res.json({
           success: false,
           msg: 'Usuario ya existe'
       });
   }

    //generar el código de autenticación
    const code = uuidv4();

    //Crear el nuevo usuario
    user = new User({ name, email, code });

    //generar el Token
    const token = getToken(email, code);
    //Obtener un template
    const template = getTemplate(name, token);

    //enviar el correo.
    await sendEmail(email, "este es un email de prueba", template);

    // guardamos el user
    await user.save();
    res.json({
      success: true,
      msg: "uesr registered",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: "Error while registering user",
    });
  }
};

module.exports = {
  signUp
}
