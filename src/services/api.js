/**
 * Inicio de sesión del usuario
 * @param {*} email 
 * @param {*} password 
 */
import theHandler from '../handlerState'
const Base_api = theHandler.server()
export function signIn(email, password) {
    return fetch(`${Base_api}doctors/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json', }
    });
}

/**
 * Registro del medico
 * @param {*} name 
 * @param {*} lastName 
 * @param {*} email 
 * @param {*} password 
 */
export function singUp(name, lastName, medicalCenter, email, password) {
    return fetch(`${Base_api}doctors`, {
        method: 'POST',
        body: JSON.stringify({ name, lastName, email, medicalCenter, password }),
        headers: { 'Content-Type': 'application/json', }
    });
}

/**
 * Cambiar contraseña del medico
 * @param {*} email 
 * @param {*} password 
 */
export function changePass(email, newpassword) {
    return fetch(`${Base_api}doctors/changepass`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'email': email, 'newpassword': newpassword }
    });
}

/**
 * Obtener código de verificación
 * @param {*} email 
 */
export function getCode(email) {
    return fetch(`${Base_api}doctors/codever`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'email': email }
    });
}

/**
 * Registar un paciente
 * @param {*} name 
 * @param {*} lastName 
 * @param {*} birthdate 
 * @param {*} age
 * @param {*} documentType 
 * @param {*} documentNumber 
 * @param {*} sex 
 * @param {*} password 
 * @param {*} doc
 * @param {*} avatar
 * @param {*} dateAssociation
 * @param {*} steps
 * @param {*} smoking
 * @param {*} token
 */
export async function regPaciente(name, lastName, birthdate, age, documentType, documentNumber,
    sex, password, email, doc, avatar, dateAssociation, steps, smoking, token, logged) {
    //sugiero no pedir la edad, ya que esta se puede calcular con la fecha de nacimiento,los pasos no entiendo para que se mandan como parametro en el front si siempre van a ir en 0,el token y el logged tampoco deberían mandarse ni almacenarse en bd
    /*console.log("nombre: " + name)
    console.log("apellido: " + lastName)
    console.log("fecha de nacimiento: " + birthdate)
    console.log("edad: " + age)
    console.log("tipo de documento: " + documentType)
    console.log("numero de documento: " + documentNumber)
    console.log("sexo: " + sex)
    console.log("contraseña: " + password)
    console.log("email: " + email)
    console.log("doc: " + doc)
    console.log("avatar: " + avatar)
    console.log("dateAssociation: " + dateAssociation)
    console.log("steps" + steps)
    console.log("smoking" + smoking)
    console.log("token" + token)
    console.log("logged" + logged)*/
    let query = await fetch(`${Base_api}patients/`, {
        method: 'POST',
        body: JSON.stringify({
            name, lastName, birthdate, age, documentType, documentNumber,
            sex, password, email, doc, avatar, dateAssociation, steps, smoking, token, logged
        }),
        headers: { 'Content-Type': 'application/json', }
    });
    let queryJson = await query.json()
    return queryJson

}

/**
 * Obtener id de un paciente
 * @param {*} documentnumber 
 */
export async function getSinglePatient(documentnumber) {

    let query = await fetch(`${Base_api}patients/buscarPaciente`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'documentnumber': documentnumber }
    });
    let queryJson = await query.json()
    return queryJson
}

/**
 * Añadir la información médica del paciente
 * @param {*} clinicalContext 
 * @param {*} medicalCenter
 * @param {*} testFindRisk
 * @param {*} isDiabetic
 * @param {*} weight 
 * @param {*} height 
 * @param {*} abdominalperimeter
 * @param {*} patient 
 * @param {*} date 
 */
export function medicalInfos(clinicalContext, medicalCenter, testFindRisk, isDiabetic,
    weight, height, abdominalperimeter, patient, date, fumador) {
    return fetch(`${Base_api}medicalInfos`, {
        method: 'POST',
        body: JSON.stringify({
            clinicalContext, medicalCenter, testFindRisk, isDiabetic,
            patient, weight, height, abdominalperimeter, date, fumador
        }),
        headers: { 'Content-Type': 'application/json', }
    });
}


/**
 * Obtener información médica del paciente
 * @param {*} patient
 */
export function getMedicalInfos(patient) {

    return fetch(`${Base_api}medicalInfos/buscar`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'patient': patient }
    });
}

/**
 * Actualizar peso
 * @param {*} id 
 * @param {*} weight 
 */
export function updateWeight(id, weight, date) {

    return fetch(`${Base_api}medicalInfos/updateweight`, {
        method: 'PUT',
        body: JSON.stringify({ weight, id, date }),
        headers: { 'Content-Type': 'application/json', }
    });

}

/**
 * Obtengo el peso del paciente
 * @param {*} id 
 */
export function getWeight(id) {

    return fetch(`${Base_api}medicalInfos/getweight`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'id': id }
    });

}

/**
 * Obtengo una lista de pacientes a partir del id de doctor
 * @param {*} doc 
 */
export function getPatients(doc) {
    return fetch(`${Base_api}patients/buscar`, {
        method: 'POST',
        body: JSON.stringify({ doc }),
        headers: { 'Content-Type': 'application/json', }
    });
}

/**
 * 
 * @param {*} name 
 * @param {*} lastName 
 * @param {*} birthdate 
 * @param {*} age 
 * @param {*} documentType 
 * @param {*} documentNumber 
 */
export function editPatient(name, lastName, birthdate, age, documentType, documentNumber) {
    return fetch(`${Base_api}patients/edit`, {
        method: 'PUT',
        body: JSON.stringify({ name, lastName, birthdate, age, documentType, documentNumber }),
        headers: { 'Content-Type': 'application/json', }
    });
}


/**
 * Proceso para eliminar un paciente
 * @param {*} id 
 */
export async function detelePatient(id) {
    try {
        let query = await fetch(`${Base_api}patients/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'id': id }
        });
        let queryJson = await query.json()
        return queryJson
    } catch (err) {
        console.log("Error atrapado en delepatient " + err)
    }
}


/********************************PARACLINICOS*************************************************/
/**
 * Añadir un paraclinico
 * @param {*} type 
 * @param {*} value 
 * @param {*} comment 
 * @param {*} file 
 * @param {*} patient
 * @param {*} date
 */
export function setParaclinico(type, value, comment, patient, date) {

    return fetch(`${Base_api}paraclinicals/`, {
        method: 'POST',
        body: JSON.stringify({ type, value, comment, patient, date }),
        headers: { 'Content-Type': 'application/json', }
    });
}


/**
 * Obtengo el paraclinico
 * @param {*} patient 
 */
export function getParaclinico(patient) {
    return fetch(`${Base_api}paraclinicals/buscar`, {
        headers: { 'Content-Type': 'application/json', 'patient': patient, }
    });
}


/********************************METAS*****************************************/
/**
 * Creo una meta y la guardo en la base de datos
 * @param {*} description 
 * @param {*} state 
 * @param {*} quantity 
 * @param {*} typeFrequency 
 * @param {*} frequency 
 * @param {*} intensityLevel 
 * @param {*} typeMessage 
 * @param {*} pat 
 * @param {*} dueDate 
 * @param {*} progress 
 * @param {*} tag 
 * @param {*} nMessages 
 * @param {*} complianceDate 
 */
export function setGoal(description, state, quantity, frequency,
    pat, dueDate, progress, tag, nMessages, creationDate, complianceDate) {
    return fetch(`${Base_api}goals/`, {
        method: 'POST',
        body: JSON.stringify({
            description, state, quantity,
            frequency, pat, dueDate, progress, tag, nMessages, creationDate, complianceDate
        }),
        headers: { 'Content-Type': 'application/json', }
    });
}

/**
 * Obtengo las metas del paciente
 * @param {*} pat 
 */
export function getGoals(pat) {
    return fetch(`${Base_api}goals/buscar`, {
        method: 'POST',
        body: JSON.stringify({ pat }),
        headers: { 'Content-Type': 'application/json', }
    });
}

/**
 * Actualizar una meta
 * @param {*} description 
 * @param {*} quantity 
 * @param {*} frequency 
 * @param {*} dueDate 
 */
export function editGoal(description, quantity, frequency, dueDate) {
    return fetch(`${Base_api}goals/putgoal`, {
        method: 'PUT',
        body: JSON.stringify({ description, quantity, frequency, dueDate }),
        headers: { 'Content-Type': 'application/json', }
    });
}
/**
 * Obtengo TODAS las metas predefinidas
 */
export function getGoalsP() {
    return fetch(`${Base_api}goalps`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', }
    });
}

/**
 * Creo una meta predefinida
 * @param {*} description 
 */
export function setGoalsP(description) {
    return fetch(`${Base_api}goalps`, {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: { 'Content-Type': 'application/json', }
    });
}
/**
 * Borrar una meta--- ese id es el de la meta.
 * @param {*} id  
 */
export function deleteGoal(id) {
    return fetch(`${Base_api}goals/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'id': id }
    });
}
/**
 * Actualizo información medica del paciente, valor del findrisk y si es diabetico
 * @param {*} testFindrisk 
 * @param {*} isDiabetic 
 * @param {*} patient 
 * @param {*} imc
 * @param {*} height
 
 */
export function setFindriskVal(testFindRisk, isDiabetic, patient, imc, height) {
    return fetch(`${Base_api}medicalInfos/`, {
        method: 'PUT',
        body: JSON.stringify({ testFindRisk, isDiabetic, patient, imc, height }),
        headers: { 'Content-Type': 'application/json', }
    });
}


/**
 * Obtener el valor del findrisk
 * @param {*} patient 
 */
export function getFindriskVal(patient) {
    return fetch(`${Base_api}medicalInfos/findTestfr`, {
        headers: { 'Content-Type': 'application/json', 'patient': patient }
    });
}


/**
 * Guardar un mensaje del doctor para el paciente
 * @param {*} description
 * @param {*} date
 * @param {*} patient
 * @param {*} doctor 
 * @param {*} doctorName
 * @param {*} subject
 */
export function setMessages(description, date, patient, doctor, doctorName, subject) {
    return fetch(`${Base_api}messagesD/`, {
        method: 'POST',
        body: JSON.stringify({ description, date, patient, doctor, doctorName, subject }),
        headers: { 'Content-Type': 'application/json', }
    });
}


/**
 * Obtener lista de mensajes por doctor
 * @param {*} doctor
 * @param {*} patient
 */
export function getMessages(doctor, patient) {
    return fetch(`${Base_api}messagesD/findByDocandP`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'doctor': doctor, 'patient': patient }
    });
}


/**
 * Escribir modelo bayesiano
 * @param {*} patient
 */
export function createModel(patient) {
    return fetch(`${Base_api}bayesianModel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ "r": 0, "s": 0, patient })
    });
}

/**
 * 
 * @param {*} abdominalperimeter 
 * @param {*} date 
 * @param {*} patient 
 */
export function setAbPerimeter(abdominalperimeter, date, patient) {
    return fetch(`${Base_api}medicalInfos/updateap`, {
        method: 'PUT',
        body: JSON.stringify({ abdominalperimeter, date, patient }),
        headers: { 'Content-Type': 'application/json', }
    });
}

/**
 * 
 * @param {*} id 
 */
export function getAbPerimeter(id) {
    return fetch(`${Base_api}medicalInfos/getap`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'patient': id }
    });
}
