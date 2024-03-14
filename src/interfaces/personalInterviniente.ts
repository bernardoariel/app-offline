interface PrimaryAttributes{
  id?:string;
  apellido: string;
  nombre: string;
}

export interface PersonalIntervinienteForm extends PrimaryAttributes{
  jerarquia: { name: string };
  dependencia: { name: string };
}

export interface PersonalInterviniente extends PrimaryAttributes{
  jerarquia: string;
  dependencia: string;
}