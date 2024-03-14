import { Method } from "./enum";

export interface ModulePriviligeFormField{

    master_screen_id?:string;
    moduleShortName?:string;
    moduleName?:string;
    description?:string;
    privileges?: {
      key:number;
      privilegeId: string;
      method: Method;
      url: string;
    }[];
  }

  export interface ModulePrivilegeEditFormField{
    masterModule: string;
    master_screen_id?:string;
    moduleShortName?:string;
    moduleName?:string;
    description?:string;
    privileges?: {
      masterModulePrivilegeId:string;
      key:number;
      privilegeId: string;
      method: Method;
      url: string;
    }[];
  }