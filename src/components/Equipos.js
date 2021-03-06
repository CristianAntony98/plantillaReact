
import React, {  useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputMask } from "primereact/inputmask";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import Swal from 'sweetalert2';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { AutoComplete } from 'primereact/autocomplete';

import Moment from 'react-moment';
import 'moment-timezone';
import EquiposService from '../service/EquiposService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';
import  EmpleadosDatosService  from '../service/EmpleadosDatosService';



const Equipos = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});


const [lstEquipos, setLstEquipos] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgEquipos, setDlgEquipos] = useState(false);
const [Equipos, setEquipos] = useState({idEquipo:null
    ,nombreEquipo: ''
    ,serialEquipo: ''
    ,ipEquipo: ''
    ,licenciaEquipo: ''
    ,fechaCompra: ''
    ,marcaEquipo: ''
    ,categEquipo: ''
    ,ramEquipo: ''
    ,discoEquipo: ''
    ,pantallaEquipo: ''
    ,empleadoEquipo: ''

});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','Equipos']);
const [captura, setCaptura] = useState(false);
const equiposService = new EquiposService(); //MODIFICAR SERVICES
const [selectedMarca, setSelectedMarca] = useState(null);
const [selectedCategoriaEquipo, setSelectedCategoriaEquipo] = useState(null);
const [selectedRam, setSelectedRam] = useState(null);
const [selectedDisco, setSelectedDisco] = useState(null);
const [selectedPantalla, setSelectedPantalla] = useState(null);

const marcas = [
   { name: 'Marca1', code: 'M1' },
   { name: 'Marca2', code: 'M2' },
   { name: 'Marca3', code: 'M3' },
   { name: 'Marca4', code: 'M4' },
   { name: 'Marca5', code: 'M5' }
];
const categoriasEquipo = [
   { name: 'CategoriaEquipo1', code: 'CE1' },
   { name: 'CategoriaEquipo2', code: 'CE2' },
   { name: 'CategoriaEquipo3', code: 'CE3' },
   { name: 'CategoriaEquipo4', code: 'CE4' },
   { name: 'CategoriaEquipo5', code: 'CE5' }
];
const ram = [
    { name: 'Ram1', code: 'R1' },
    { name: 'Ram2', code: 'R2' },
    { name: 'Ram3', code: 'R3' },
    { name: 'Ram4', code: 'R4' },
    { name: 'Ram5', code: 'R5' }
 ];
 const discos = [
    { name: 'Disco1', code: 'D1' },
    { name: 'Disco2', code: 'D2' },
    { name: 'Disco3', code: 'D3' },
    { name: 'Disco4', code: 'D4' },
    { name: 'Disco5', code: 'D5' }
 ];
 const pantallas = [
    { name: 'Pantalla1', code: 'P1' },
    { name: 'Pantalla2', code: 'P2' },
    { name: 'Pantalla3', code: 'P3' },
    { name: 'Pantalla4', code: 'P4' },
    { name: 'Pantalla5', code: 'P5' }
 ];
const onMarcaChange = (e) => {
   setSelectedMarca(e.value);
}
const onCategoriaEquipoChange = (e) => {
   setSelectedCategoriaEquipo(e.value);
}
const onRamChange = (e) => {
    setSelectedRam(e.value);
 }
 const onDiscoChange = (e) => {
    setSelectedDisco(e.value);
 }
 const onPantallaChange = (e) => {
    setSelectedPantalla(e.value);
 }

//Autocomplete


const [countries, setCountries] = useState([]);
const [selectedCountry2, setSelectedCountry2] = useState(null);
const [selectedItem, setSelectedItem] = useState(null);
const [filteredCountries, setFilteredCountries] = useState(null);
const empleadoServide = new EmpleadosDatosService();


const items = Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i }));

useEffect(() => {
    empleadoServide.getCountries().then(data => setCountries(data));
}, []); 

const searchCountry = (event) => {
    setTimeout(() => {
        let _filteredCountries;
        if (!event.query.trim().length) {
            _filteredCountries = [...countries];
        }
        else {
            _filteredCountries = countries.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }

        setFilteredCountries(_filteredCountries);
    }, 250);
}



    

const itemTemplate = (item) => {
    return (
        <div className="country-item">
            <div>{item.name}</div>
        </div>
    );
}






const equiposSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
Swal.fire(mensajeCopy);
}


const obtenerEquipo = ()   =>   { //MODIFICAR EN SERVICE
equiposService.obtenerEquipo (txtCriterio).then(data => setLstEquipos(data));
};

const seleccionaEquipo = (pEquipos)   =>   {
setCaptura(false);
formik.resetForm();
equiposService.seleccionaEquipo (pEquipos).then(data => setEquipos(data));
setDlgEquipos(true);
};

useEffect(()   =>   {
obtenerEquipo();
},  [txtCriterio]);


const agregaEquipo = ()   =>   {
equiposService.agregaEquipo (Equipos).
then(data => {setEquipos(data);
equiposSuccess('success',t('Equipos:cabecero.exito'),t('Equipos:mensaje.agregar'));
setDlgEquipos(false);
obtenerEquipo ();
});
};

const eliminaEquipo = ()   =>   {
Equipos.eliminaEquipo (Equipos);
equiposSuccess('success',t('Equipos:cabecero.exito'),t('Equipos:mensaje.eliminar'));
setDlgEquipos(false);
obtenerEquipo();
obtenerEquipo();
};

const actualizaEquipo = ()   =>   {
equiposService.actualizaEquipo (Equipos).
then(data => { setDlgEquipos(false); obtenerEquipo();});
};

const updateProperty = (propiedad, valor)   =>  {
let equipoCopy = Object.assign({}, Equipos);
equipoCopy[propiedad] = valor;
setEquipos(equipoCopy);
};

const iniciaEquipos = ()   =>   {
setCaptura(true);
iniciaComponentes();
setDlgEquipos(true);
};

const iniciaComponentes = ()   =>   {
setEquipos({idEquipo:null
    ,nombreEquipo: ''
    ,serialEquipo: ''
    ,ipEquipo: ''
    ,licenciaEquipo: ''
    ,fechaCompra: ''
    ,marcaEquipo: ''
    ,categEquipo: ''
    ,ramEquipo: ''
    ,discoEquipo: ''
    ,pantallaEquipo: ''
    ,empleadoEquipo: ''
});
formik.resetForm();
};

/**
* Validaci??n de las propiedades 
*
*/
const validate = () => {
const errors = {};
 if (!Equipos.idEquipo) {
errors.txtIdEquipo= t('Equipos:required.idEquipo');
}
return errors;
};

const formik = useFormik({
initialValues: {} ,
validate,
onSubmit: () => {
if(captura){
agregaEquipo();
} else{
actualizaEquipo();
}
},
});

const fechaTemplate = (rowData, column)   =>   {
return (
<div>
   <Moment format={t('formato.fechaHora')}>
      {rowData.fechaAlta ? rowData.fechaAlta: null}
      
   </Moment>
</div>);      
}


const actionTemplate = (rowData, column)   =>   {
return (
<div><Button type="button" icon="pi pi-search" className="p-button-rounded" onClick={()  =>  {seleccionaEquipo(rowData);} }></Button><Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaEquipo(rowData); } }></Button></div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('Equipos:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgEquipos(false) }></Button>                 
         { !captura   &&  <Button tooltip={t('Equipos:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaEquipo }></Button>}                 
         { !captura   &&  <Button tooltip={t('Equipos:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         { captura   &&  <Button tooltip={t('Equipos:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 





return (

<div>
   <h1>
      <Trans i18nKey="Equipos:entidad"></Trans>
   </h1>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('Equipos:placeholder.idEquipo')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Equipos:boton.agregar')} icon="pi pi-plus" onClick={iniciaEquipos}></Button></div>
      </div>
   </div>
   <DataTable value={lstEquipos} paginator={true} rows={10} responsive={true}>
      <Column field="idEquipo" header={t('Equipos:label.idEquipo')} sortable={true}></Column>
      <Column field="nombreEquipo" header={t('Equipos:label.nombreEquipo')} sortable={true}></Column>
      <Column field="serialEquipo" header={t('Equipos:label.serialEquipo')} sortable={true}></Column>
      <Column field="ipEquipo" header={t('Equipos:label.ipEquipo')} sortable={true}></Column>
      <Column field="licenciaEquipo" header={t('Equipos:label.licenciaEquipo')} sortable={true}></Column>
      <Column field="fechaCompra" header={t('Equipos:label.fechaCompra')} sortable={true}></Column>
      <Column field="marcaEquipo" header={t('Equipos:label.marcaEquipo')} sortable={true}></Column>
      <Column field="categEquipo" header={t('Equipos:label.categEquipo')} sortable={true}></Column>
      <Column field="ramEquipo" header={t('Equipos:label.ramEquipo')} sortable={true}></Column>
      <Column field="discoEquipo" header={t('Equipos:label.discoEquipo')} sortable={true}></Column>
      <Column field="pantallaEquipo" header={t('Equipos:label.pantallaEquipo')} sortable={true}></Column>
      <Column field="empleadoEquipo" header={t('Equipos:label.empleadoEquipo')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('Equipos:rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('Equipos:rotulo.agregar')} footer={dlgFooter} visible={dlgEquipos} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgEquipos(false)} blockScroll={false}>
      { Equipos  &&  
      <div>
         <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-4"><label htmlFor="txtIdEquipo">
                  {t('Equipos:label.idEquipo')}
                  </label>
               {{captura} ? ( 
               <InputText id="txtidEquipo" placeholder={t('Equipos:placeholder.idEquipo')} value={Equipos.idEquipo} className={formik.errors.txtIdEquipo ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('idEquipo', e.target.value)}></InputText>    
               ):(     <label id="txtIdEquipo">equipos.idEquipo</label>)}
               
               {formik.errors.txtIdEquipo  &&  <small id="txtIdEquipo-help" className="p-invalid">
                  {formik.errors.txtIdEquipo}
                  </small>}                 
               
            </div>
            <div className="p-field p-col-12 p-md-4"><label htmlFor="txtActivo">
                  {t('Equipos:label.nombreEquipo')}
                  </label>
               {{captura} ? ( 
                  <InputText id="txtNombreEquipo" placeholder={t('Equipos:placeholder.nombreEquipo')} value={Equipos.nombreEquipo} className={formik.errors.txtNombreEquipo ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombreEquipo', e.target.value)}></InputText>    
                  ):(     <label id="txtNombreEquipo">equipos.nombreEquipo</label>)}
                  
            </div>
            <div className="p-field p-col-12 p-md-4"><label htmlFor="txtSerialEquipo">
                  {t('Equipos:label.serialEquipo')}
                  </label>
               {{captura} ? ( 
                   <InputText id="txtSerialEquipo" placeholder={t('Equipos:placeholder.serialEquipo')} value={Equipos.serialEquipo} className={formik.errors.txtSerialEquipo ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('serialEquipo', e.target.value)}></InputText>    
                   ):(     <label id="txtSerialEquipo">equipos.serialEquipo</label>)}
                   
            </div>   
            <div className="p-field p-col-12 p-md-4"><label htmlFor="txtIPEquipo">
                  {t('Equipos:label.ipEquipo')}
                  </label>
               {{captura} ? ( 
                   <InputText id="txtIPEquipo" placeholder={t('Equipos:placeholder.ipEquipo')} value={Equipos.ipEquipo} className={formik.errors.txtIPEquipo ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('ipEquipo', e.target.value)}></InputText>    
                   ):(     <label id="txtIPEquipo">equipos.ipEquipo</label>)}
            </div>   
            <div className="p-field p-col-12 p-md-4"><label htmlFor="txtLicenciaEquipo">
                  {t('Equipos:label.licenciaEquipo')}
                  </label>
               {{captura} ? ( 
                   <InputText id="txtLicenciaEquipo" placeholder={t('Equipos:placeholder.licenciaEquipo')} value={Equipos.licenciaEquipo} className={formik.errors.txtLicenciaEquipo ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('licenciaEquipo', e.target.value)}></InputText>    
                   ):(     <label id="txtLicenciaEquipo">equipos.licenciaEquipo</label>)}
            </div>   
            <div className="p-field p-col-12 p-md-4"><label htmlFor="txtFechaCompra">
                  {t('Equipos:label.fechaCompra')}
                  </label>
               {{captura} ? ( 
               <InputMask id="txtFechaCompra" mask="9999-99-99T99:99:99" placeholder={t('Equipos:placeholder.fechaCompra')} value={Equipos.fechaCompra} className={formik.errors.txtFechaCompra ? 'p-invalid':'p-inputtext'} maxLength={19} onChange={(e) =>   updateProperty('fechaCompra', e.target.value)}></InputMask>    
               ):(     <label id="txtFechaCompra">equipos.fechaCompra</label>)}
               
            </div>     
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtMarcaEquipo">
                  {t('Equipos:label.marcaEquipo')}
                  </label>
               {{captura} ? ( 
                  <Dropdown value={selectedMarca} options={marcas} onChange={onMarcaChange} optionLabel="name" placeholder={t('Equipos:placeholder.marcaEquipo')} onChange={(e) =>   updateProperty('marcaEquipo', e.target.value)} />               
                  ):(     <label id="txtMarcaEquipo">equipos.marcaEquipo</label>)}
               
            </div>   
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtCatEquipo">
                  {t('Equipos:label.categEquipo')}
                  </label>
               {{captura} ? ( 
                  <Dropdown value={selectedCategoriaEquipo} options={categoriasEquipo} onChange={onCategoriaEquipoChange} optionLabel="name" placeholder={t('Equipos:placeholder.categEquipo')} onChange={(e) =>   updateProperty('categEquipo', e.target.value)}/>               
                  ):(     <label id="txtCatEquipo">equipos.categEquipo</label>)}
               
            </div>    
            <div className="p-field p-col-12 p-md-4"><label htmlFor="txtRamEquipo">
                  {t('Equipos:label.ramEquipo')}
                  </label>
               {{captura} ? ( 
                  <Dropdown value={selectedRam} options={ram} onChange={onRamChange} optionLabel="name" placeholder={t('Equipos:placeholder.ramEquipo')} onChange={(e) =>   updateProperty('ramEquipo', e.target.value)}/>               
                  ):(     <label id="txtRamEquipo">equipos.ramEquipo</label>)}
               
            </div>   
            <div className="p-field p-col-12 p-md-4"><label htmlFor="txtDiscoEquipo">
                  {t('Equipos:label.discoEquipo')}
                  </label>
               {{captura} ? ( 
                  <Dropdown value={selectedDisco} options={discos} onChange={onDiscoChange} optionLabel="name" placeholder={t('Equipos:placeholder.discoEquipo')}  onChange={(e) =>   updateProperty('discoEquipo', e.target.value)}/>               
                  ):(     <label id="txtDiscoEquipo">equipos.discoEquipo</label>)}
               
            </div>   
            <div className="p-field p-col-12 p-md-4"><label htmlFor="txtPantallaEquipo">
                  {t('Equipos:label.pantallaEquipo')}
                  </label>
               {{captura} ? ( 
                  <Dropdown value={selectedPantalla} options={pantallas} onChange={onPantallaChange} optionLabel="name" placeholder={t('Equipos:placeholder.pantallaEquipo')} onChange={(e) =>   updateProperty('pantallaEquipo', e.target.value)} />               
                  ):(     <label id="txtPantallaEquipo">equipos.pantallaEquipo</label>)}
              

            </div>  
            <div className="p-field p-col-12 p-md-12"><label htmlFor="txtEmplEquipo">
                  {t('Equipos:label.empleadoEquipo')}
                  </label>
               {{captura} ? ( 
            <AutoComplete value={selectedCountry2} suggestions={filteredCountries} completeMethod={searchCountry} placeholder={t('Equipos:placeholder.empleadoEquipo')} field="name" dropdown forceSelection itemTemplate={itemTemplate} onChange={(e) => setSelectedCountry2(e.value)}  />
            ):(     <label id="txtEmplEquipo">equipos.empleadoEquipo</label>)}
               
            </div>      
         </div>
      </div>
      
      }
      
   </Dialog>
</div>
);



}                
export default Equipos;                                        	


