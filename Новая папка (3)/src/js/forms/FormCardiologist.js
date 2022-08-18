import Input from "./Input.js"
import TextArea from "./TextArea.js"
import {fieldsForm} from "./FieldsForm.js"
import Form from "./Form.js"

export default class FormCardiologist extends Form {

   constructor(doctor,purpose, desc, priority, age, id,pressure, weightIndex, heartIllness, fullName) {
      super(doctor, fullName, priority, purpose, desc);
      this.pressure = new Input(fieldsForm.pressure, "form__input").create();
      this.placeholderForEdit(pressure, this.pressure, 'Change/confirm pressure:' )

      this.weightIndex = new Input(fieldsForm.weightIndex, "form__input").create();
      this.placeholderForEdit(weightIndex, this.weightIndex, 'Change/confirm body mass index: ' )

      this.heartIllness = new TextArea(fieldsForm.illness, "form__input").create();
      this.placeholderForEdit(heartIllness, this.heartIllness, 'Change/confirm previous diseases of the cardiovascular system:' )

      this.age = new Input(fieldsForm.age, "form__input").create();
      this.placeholderForEdit(age, this.age, 'Change/confirm age: ' )
   }

   render(modal) {
      super.render(modal);

      const nodes = [this.pressure, this.weightIndex, this.heartIllness, this.age];
      nodes.forEach(node => {
         this.self.insertBefore(node, this.submit);
      })
   }
}