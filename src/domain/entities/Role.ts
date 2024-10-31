export type RoleProps = {
  id?: string;
  name: string;
};

export class Role {
  constructor(private props: RoleProps) {}

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  updateName(name: string) {
    this.props.name = name;
  }
}
