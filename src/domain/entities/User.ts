export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
};

export class User {
  constructor(private props: UserProps) {}

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public get roleId() {
    return this.props.roleId;
  }
}
