import React, { Component } from 'react'

class App extends Component {
    constructor() {
        super()
        this.state = {
           valor:"",
           minimo:"",
           maximo:"",
           ArrayValores: [],
           media: '',
           total_entrada:'',
           total_valido: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    //metodo de cambios
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    //metodo que calcula todo
    onSubmit(e){
      e.preventDefault()
      //convercion de array de strings a array de numeros
      let valor = this.state.valor.split(",").map(x=>+x);
      let minimo = parseInt(this.state.minimo);
      let maximo = parseInt(this.state.maximo);
      let media;
      let i = 0;
      let total_entrada = 0, total_valido = 0
      let suma = 0

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

      this.setState({media: media});
      this.setState({total_entrada: total_entrada});
      this.setState({total_valido: total_valido});

      console.log(media);
      console.log(total_entrada);
      console.log(total_valido);
    }



    render() {
        return (
          <div>
            <div className="p-3 mb-2 bg-success text-white text-center h3">EXAMEN DE EVALUACION Y AUDITORIA DE SISTEMAS</div>
            <div className="container mt-5">
              <div className="row">
                <div className="col">
                  <form noValidate onSubmit={this.onSubmit}>
                    <h4 className="text-center mb-4">Primer parcial</h4>
                    <div className="form-group">
                      <label htmlFor="titulo"><b>Valor</b></label><br/>
                      <label htmlFor="subtitulo">Indroduzca numeros separados por una coma y SIN ESPACIOS. Ejemplo: 15.2,12,14,74,2.2. los espacios en blanco seran rellenados con ceros!</label>
                      <input 
                        type="text" 
                        id="valor"
                        className="form-control" 
                        name="valor"
                        value={this.state.valor}
                        onChange={this.onChange}
                        />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="titulo"><b>Minimo</b></label><br/>
                        <input 
                          type="number" 
                          id="minimo"
                          className="form-control" 
                          name="minimo"
                          value={this.state.minimo}
                          onChange={this.onChange}
                          />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="titulo"><b>Maximo</b></label><br/>
                        <input 
                          type="number" 
                          id="maximo"
                          className="form-control" 
                          name="maximo"
                          value={this.state.maximo}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success">CALCULAR</button>
                  </form>
                </div>
              </div>
              <div className="mt-5">
                <p id='media'>{"Media = " + this.state.media}</p>
                <p id='entrada'>{"Total entradas = " + this.state.total_entrada}</p>
                <p id='valido'>{"Total valido = " + this.state.total_valido}</p>
              </div>
            </div>
          </div>
        )
    }
}

export default App