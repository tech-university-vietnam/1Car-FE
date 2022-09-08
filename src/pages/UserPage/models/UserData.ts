export class UserData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  dateOfBirth: string | null;

  constructor(
    props: null | {
      id: string;
      name: string;
      email: string;
      phoneNumber: string | null;
      dateOfBirth: string | null;
    }
  ) {
    if (props) {
      this.id = props.id;
      this.name = props.name;
      this.email = props.email;
      this.phoneNumber = props.phoneNumber;
      this.dateOfBirth = props.dateOfBirth;
    } else {
      this.id = 'test id';
      this.name = 'test name';
      this.email = 'test email';
      this.phoneNumber = null;
      this.dateOfBirth = null;
    }
  }
}
