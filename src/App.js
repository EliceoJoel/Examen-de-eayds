import React, { useState } from 'react';

function App(props) {

   const [datos, setDatos] = useState({
      valor: '',
      minimo: '',
      maximo: '',
      media: '',
      total_entrada: '',
      total_valido: ''
   });

   const [errors, setErrors] = useState({
      errorValor: '',
      errorMaximo: '',
      errorMinimo: ''
   })

   const handleChange = (e) => {
      setDatos({...datos, [e.target.name]: e.target.value});
      setErrors({...errors, errorValor:"", errorMaximo:"", errorMinimo: ""})
   }

   const calcular = (e) => {
      e.preventDefault();
      if (validado()){
         let valor = datos.valor.split(',').map(x=>+x);
         let minimo = parseInt(datos.minimo);
         let maximo = parseInt(datos.maximo);
         let media;
         let i = 0;
         let total_entrada = 0;
         let total_valido = 0;
         let suma = 0;
         
         while(valor[i] !== undefined && total_entrada < 100){
            total_entrada = total_entrada + 1;
            if( valor[i] >= minimo && valor[i] <= maximo){
              total_valido = total_valido + 1;
              suma = suma + valor[i]; 
            }
            i = i + 1;
         }
         if(total_valido > 0){
            media = suma / total_valido;
         }else{
            media = -999
         }
         setDatos({...datos, media, total_entrada, total_valido});
      }
   }


   const validado = () => {

      let res = false
      let valor = datos.valor.split(',').map(x=>+x);

      if(valor.length === 1 && valor[0] === 0){
         setErrors({...errors, errorValor: "Campo vacio, intruduzca numeros"})
      }else if(valor.length > 100 ){
         setErrors({...errors, errorValor: "La cantidad de numeros no debe sobre pasar los 100"})
      }else if(valor.length < 2){
         setErrors({...errors, errorValor: "La cantidad minina de numeros es de almenos 2"})
      }else if(datos.minimo === ''){
         setErrors({...errors, errorMinimo: "Campo vacio, introduzca un numero"})
      }else if(datos.maximo === ''){
         setErrors({...errors, errorMaximo: "Campo vacio, introduzca un numero"})
      }else{
         res = true;
      }

      if(res === false) {
         setDatos({...datos, media:"", total_entrada:"", total_valido:""}) 
      }
      return res;
   }
   

   return (
      <div>
         <div className="p-3 mb-2 bg-success text-white text-center h3">EXAMEN DE EVALUACION Y AUDITORIA DE SISTEMAS</div>
            <div className="container mt-5">
               <div className="row">
                  <div className="col">
                     <form noValidate onSubmit={calcular}>
                        <h4 className="text-center mb-4">Primer parcial</h4>
                        <div className="form-group">
                           <label htmlFor="titulo"><b>Valor</b></label><br/>
                           <label htmlFor="subtitulo">Indroduzca numeros separados por una coma y SIN ESPACIOS. Ejemplo: 15.2,12,14,74,2.2. los espacios en blanco seran rellenados con ceros!</label>
                           <input 
                             type="text" 
                             id="valor"
                             className="form-control" 
                             name="valor"
                             onChange={handleChange}
                           />
                           <p className="text-danger" id="errorValor">{errors.errorValor}</p>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="titulo"><b>Minimo</b></label><br/>
                            <input 
                              type="number" 
                              id="minimo"
                              className="form-control" 
                              name="minimo"
                              onChange={handleChange}
                              />
                              <p className="text-danger" id="errorMinimo">{errors.errorMinimo}</p>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="titulo"><b>Maximo</b></label><br/>
                            <input 
                              type="number" 
                              id="maximo"
                              className="form-control" 
                              name="maximo"
                              onChange={handleChange}
                            />
                            <p className="text-danger" id="errorMaximo">{errors.errorMaximo}</p>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-success">CALCULAR</button>
                     </form>
                  </div>
               </div>
               <div className="mt-5">
                  <p><b>{"Media:"}</b></p>
                  <p id='media'>{datos.media}</p>
                  <p><b>{"Total entradas:"}</b></p>
                  <p id='entradas'>{datos.total_entrada}</p>
                  <p><b>{"Total valido:"}</b></p>
                  <p id='valido'>{datos.total_valido}</p>
               </div>
         </div>
      </div>
   );
}

export default App;
