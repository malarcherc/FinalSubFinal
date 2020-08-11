import React from "react";

function MainBody() {
    const users =[
        {name:"Bryan", job:"Human Resource Officer",department:"HR"},
        {name:"Damien", job:"Chief Executive Officer",department:"All"},
        {name:"Hojo", job:"Chief Scientist",department:"R&D"}
    ]
    
    
    const renderUser = (user, index) =>{
        return(
            <tr key={index}>
                <td>{user.name}</td>
                <td>{user.job}</td>
                <td>{user.department}</td>
            </tr>
        )
    }

    return(
       <div className="mainapp">

    <div className="App-header">
      
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
       </div>
    )

}

export default MainBody