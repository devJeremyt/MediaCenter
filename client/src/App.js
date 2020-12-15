import React from 'react'
import './App.css';
import Category from './components/category';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories: null,
    }
  }

  componentDidMount(){
    fetch('/categories',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
  
    })
    .then(response => response.json())
    .then(data=> {
      console.log(data);
      this.setState({categories: data});
    });
    }
    
    render(){
      if(this.state.categories === null){
        return 'Loading';
      } else{
        let categories = [];
        this.state.categories.forEach(category=>{
          categories.push(
                <div>
                  <h4>{category.name}</h4>
                  <Category videos={category.vidList}/>
                </div> 
          )
        })

        return (
          <div className="App">
            <div>{categories}</div>
          </div>
        );
      }
    }
}


export default App;
