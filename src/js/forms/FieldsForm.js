// Створюємо об'єкт полів форми з placeholders / Сreate a form field object with placeholders
export const fieldsForm = {
    fullName: {
       type: "text",
       placeholder: "Last name, first name",
       isRequired: true,
    },
    purpose: {
       type: "text",
       placeholder: "The purpose of the visit",
       isRequired: true
    },
    desc: {
       placeholder: "Brief description of the visit",
       isRequired: true
    },
    pressure: {
       type: "text",
       placeholder: "Normal pressure",
       isRequired: true
    },
    weightIndex: {
       type: "text",
       placeholder: "Body mass index",
       isRequired: true
    },
    illness: {
       placeholder: "Transferred diseases of the cardiovascular system",
       isRequired: true
    },
    age: {
       type: "text",
       placeholder: "Age",
       isRequired: true
    },
    lastDateVisit: {
       type: "text",
       placeholder: "Date of last visit",
       isRequired: true
    },
    submit: {
       type: "submit"
    },
    priority: [
       "Select the urgency",
       "Ordinary",
       "Priority",
       "Urgent"
    ]
 }