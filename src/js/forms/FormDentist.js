import Input from "./Input.js"
import Form from "./Form.js"
import {fieldsForm} from "./FieldsForm.js"

export default class FormDentist extends Form {
   constructor(doctor,purpose, desc, priority, age, id,pressure, weightIndex, heartIllness, fullName, lastDateVisit) {
      super(doctor, fullName, priority, purpose, desc)
      this.lastDateVisit = new Input(fieldsForm.lastDateVisit, "form__input").create();
      this.placeholderForEdit(lastDateVisit, this.lastDateVisit, 'Change/confirm date of last visit:' )
   }

   render(modal) {
      super.render(modal);
      this.self.insertBefore(this.lastDateVisit, this.submit);
   }
}