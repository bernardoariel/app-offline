export const sidebarLinks = [
    {
      path:'/',
      pathName:'escritorio',
      titulo:'ESCRITORIO',
      icon: 'pi-home',
      roles:[],
      type:'button',
      grupo:'principal'
    },
    {
      path:'/actuaciones/list',
      pathName:'actuaciones',
      titulo:'ACTUACIONES',
      icon: 'pi-folder',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario','UsuarioDependencia','Control de Gestion','Dirección de Información para el Delito D-2','Dpto. Asuntos Judiciales D-5','Dpto. Planeamiento' , 'Juez' , 'Ayudante de Juez'],
      type:'button',
      grupo:'principal'
    },
    {
      path:'/actuaciones/new/sumario-denuncia/initial',
      pathName:'sumario-denuncia',
      titulo:'Sumario Denuncia',
      icon: 'pi-briefcase',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'SUMARIOS',
      props: { formType: "denuncia", actuacionType: "sumario-denuncia", pageTitle: "PREVENCIONAL DENUNCIA" }
    },
    {
      path:'/actuaciones/new/sumario-oficio/initial',
      pathName:'sumario-oficio',
      titulo:'Sumario Oficio',
      icon: 'pi-bookmark',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'SUMARIOS',
      props: { formType: "oficio" , actuacionType: "sumario-oficio" , pageTitle: "PREVENCIONAL OFICIO" },
  
    },
    {
      path:'/actuaciones/new/expediente-denuncia/initial',
      pathName:'expediente-denuncia',
      titulo:'Expediente Denuncia',
      icon: 'pi-book',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'EXPEDIENTES',
      props: { formType: "contravencional-denuncia", actuacionType: "expediente-denuncia" , pageTitle: "CONTRAVENCIONAL DENUNCIA"},
    },
    {
      path:'/actuaciones/new/expediente-oficio/initial',
      pathName:'expediente-oficio',
      titulo:'Expediente Oficio',
      icon: 'pi-desktop',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'EXPEDIENTES',
      props: { formType: "contravencional-oficio" , actuacionType: "expediente-oficio" , pageTitle: "CONTRAVENCIONAL OFICIO" },
    },
    {
      path:'/actuaciones/new/ufi-flagrancia/initial',
      pathName:'ufi-flagrancia',
      titulo:'Flagrancia',
      icon: 'pi-bookmark-fill',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'UFI DELITOS',
      props: { formType: "ufi-flagrancia", actuacionType: "ufi-flagrancia" , pageTitle: "UFI - FLAGRANCIA" },
    }
    ,
    {
      path:'/actuaciones/new/ufi-generica-denuncia/initial',
      pathName:'ufi-generica-denuncia',
      titulo:'Genérica por Denuncia',
      icon: 'pi-box',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'UFI DELITOS',
      props: { formType: "ufi-anivi", actuacionType: "ufi-anivi" , pageTitle: "UFI - ANIVI" },
    }
    ,
    {
      path:'/actuaciones/new/ufi-generica-oficio/initial',
      pathName:'ufi-generica-oficio',
      titulo:'Genérica por Oficio',
      icon: 'pi-box',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'UFI DELITOS',
      props: { formType: "ufi-anivi", actuacionType: "ufi-anivi" , pageTitle: "UFI - ANIVI" },
    }
    ,
    {
      path:'/actuaciones/new/ufi-propiedad-denuncia/initial',
      pathName:'ufi-propiedad-denuncia',
      titulo:'Contra la Propiedad por Denuncia',
      icon: 'pi-box',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'UFI DELITOS',
      props: { formType: "ufi-anivi", actuacionType: "ufi-anivi" , pageTitle: "UFI - ANIVI" },
    }
    ,
    {
      path:'/actuaciones/new/ufi-propiedad-oficio/initial',
      pathName:'ufi-propiedad-oficio',
      titulo:'Contra la Propiedad por Oficio',
      icon: 'pi-box',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'UFI DELITOS',
      props: { formType: "ufi-anivi", actuacionType: "ufi-anivi" , pageTitle: "UFI - ANIVI" },
    }
    ,
    {
      path:'/actuaciones/new/ufi-informatica-denuncia/initial',
      pathName:'ufi-informatica-denuncia',
      titulo:'Informáticos y Estafas por Denuncia',
      icon: 'pi-box',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'UFI DELITOS',
      props: { formType: "ufi-anivi", actuacionType: "ufi-anivi" , pageTitle: "UFI - ANIVI" },
    }
    ,
    {
      path:'/actuaciones/new/ufi-informatica-oficio/initial',
      pathName:'ufi-informatica-oficio',
      titulo:'Informáticos y Estafas por Oficio',
      icon: 'pi-box',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'UFI DELITOS',
      props: { formType: "ufi-anivi", actuacionType: "ufi-anivi" , pageTitle: "UFI - ANIVI" },
    }
    ,
    {
      path:'/actuaciones/new/ufi-cavig/initial',
      pathName:'ufi-cavig',
      titulo:'Cavig',
      icon: 'pi-building',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'UFI DELITOS',
      props: { formType: "ufi-cavig", actuacionType: "ufi-cavig" , pageTitle: "UFI - CAVIG" },
    }
    ,
    {
      path:'/actuaciones/new/ufi-anivi/initial',
      pathName:'ufi-anivi',
      titulo:'Anivi',
      icon: 'pi-box',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'UFI DELITOS',
      props: { formType: "ufi-anivi", actuacionType: "ufi-anivi" , pageTitle: "UFI - ANIVI" },
    }   
    ,
    {
      path:'/actuaciones/ufi-delitos-especiales/menu',
      pathName:'ufi-delitos-especiales',
      titulo:'Especiales',
      icon: 'pi-flag-fill',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'UFI DELITOS',
      props: { formType: "ufi-delitos-especiales" , pageTitle: "UFI - DELITOS ESPECIALES"},
    }
    ,
    {
      path:'/actuaciones/preliminares/menu',
      pathName:'preliminares',
      titulo:'Preliminares',
      icon: 'pi-microsoft',
      roles:['User Tester','Super User','Jefe de Dependencia','Oficial Sumariante','Jefe de Sumario'],
      type:'link',
      grupo:'PRELIMINARES',
      props: { formType: "actuaciones-preliminares" ,  pageTitle: "ACTUACIONES PRELIMINARES"},
    },
    {
      path:'/parametros/list',
      pathName:'parametros',
      titulo:'Parametrización',
      icon: 'pi-sliders-v',
      roles:['User Tester','Super User'],
      type:'link',
      grupo:'PARAMETRIZACIÓN'
    },
    {
      path:'/deposito/efectos',
      pathName:'deposito-efectos',
      titulo:'Efectos',
      icon: 'pi-folder-open',
      roles:['User Tester','Super User','Deposito Judicial','Jefe de Dependencia'],
      type:'link',
      grupo:'DEPÓSITO'
    },
    {
      path:'/deposito/solicitudes',
      pathName:'solicitudesView',
      titulo:'Solicitudes',
      icon: 'pi-inbox',
      roles:['User Tester','Super User','Deposito Judicial','Jefe de Dependencia'],
      type:'link',
      grupo:'DEPÓSITO'
    }
    // ,
    // {
    //   path:'/indice',
    //   pathName:'direccion-d1',
    //   titulo:'Direccion-D1',
    //   icon: 'pi-hashtag',
    //   roles:['User Tester','Super User'],
    //   type:'link',
    //   grupo:'OTROS LINKS'
    // }
    ,
    {
      path:'/editar-contrasena',
      pathName:'cambiar-contraseña',
      titulo:'Cambiar Contraseña',
      icon: 'pi-key',
      roles:[],
      type:'link',
      grupo:'OTROS LINKS'
    }
    ,
    {
      path:'/logout',
      pathName:'cerrar-Sesión',
      titulo:'Cerrar Sesión',
      icon: 'pi-sign-out',
      roles:[],
      type:'link',
      grupo:'OTROS LINKS',
      action: 'logout'
    },
    {
      path: '/',
      pathName: 'spacer',
      titulo: '',
      icon: '', // Deja el icono en blanco
      roles: [],
      type: 'spacer',
      grupo: 'OTROS LINKS'
    }
  ]