
import axios from 'axios';



export default class  ServiciosService {

obtenerServicio (pCriterio){
let buscaUrl = '/expediente/tblSentidosSentencias/buscaTblSentidosSentencias/';//Modificar
let oValor = pCriterio.trim() === '' ? '%20' : pCriterio.trim(); 
return axios.get(buscaUrl + oValor).then(response  =>  response.data);
}


seleccionaServicio(pServicios) {
let seleccionaUrl = '/expediente/tblSentidosSentencias/seleccionaTblSentidosSentencias'; //Modificar
return axios.get(seleccionaUrl  + '/' + pServicios.idServicio).then(response  =>  response.data);
}

agregaEquipo (pServicios) {
let agregaUrl = '/expediente/tblSentidosSentencias/agregaTblSentidosSentencias';
return axios.post(agregaUrl, pServicios).then(response  =>  response.data);
}

eliminaServicio (pServicios) {
let eliminaUrl = '/expediente/tblSentidosSentencias/eliminaTblSentidosSentencias'; //Modificar
axios.delete(eliminaUrl  + '/' + pServicios.idServicio, {
headers: {'Content-Type': 'application/json;charset=UTF-8'},
data: pServicios
});

}

actualizaServicio (pServicios) {
let actualizaUrl = '/expediente/tblSentidosSentencias/actualizaTblSentidosSentencias'; //Modificar
return axios.put(actualizaUrl + '/' + pServicios.idServicio,  pServicios)
.then(response  =>  response.data);
}




}                


