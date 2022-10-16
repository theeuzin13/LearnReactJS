//useState e o hook que permite criar estados
import React, { useState, useEffect } from "react";

import "./style.css";
import { Card } from "../../components/Card";

export function Home() {
  //o primeiro elemento do vetor e para guardar o conteudo do estado e o segundo elemento e a funcao que atualiza esse estado, para diferenciar o primeiro do segundo usa se um set

  // o que esta atualizando esse setStudenteName e o input
  const [studentName, setStudentName] = useState("");

  //esse estado e para armazenar os estudantes da lista de presenca
  const [students, setStudents] = useState([]);

  //esse estado ta pegando os objetos nome e avatar da api do github
  const [user, setUser] = useState({ name: "", avatar: "" });

  //funcao para adicionar estudante
  function handleAddStudent() {
    //foi criado um objeto com duas propriedades para ser usado no card
    const newStudent = {
      //o nome foi pego do estado que esta armazenando o que ta sendo escrito no input
      name: studentName,
      //o tempo foi pego automatico da data atual
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    //o newStudent que no caso e objeto novo que esta sendo criado, esta sendo armazenado no estado dos estudantes da lista de presenca
    //essa arrow function foi criado para poder segurar o estado anterior, porque se nao quando eu adicionar um novo card, ao inves dele adicionar um novo ele vai substituir o que ja tem
    //e as ...(spreadoperator) foi colocado ali para deixar todos estudantes dentro do mesmo vetor, porque senao vai ficar assim por exemplo [["joao"],"matheus"]
    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
    // corpo do useEffect, tudo que estiver aqui serao as acoes ou aquilo que eu quero que execute
    // o useEffect e executado assim que a interface e renderizada
    // o vetor e utilizado para saber quais sao os estados que o useEffect depende, quando ele estiver vazio ele vai ser executado uma unica vez

    //consumingo a api do github
    //fetch e usado para fazer requisicao http
    fetch("https://api.github.com/users/theeuzin13")
      //utilizando o then porque e uma promise
      //a response esta sendo convertida para json
      .then((response) => response.json())
      //aqui esta recuperando os dados da api
      .then((data) => {
        //atribuindo para meu setUser o nome e o avatar da api
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        });
      });
  }, []);

  //usando o async no useEffect

  // useEffect(() => {
  //   async function fetchData(){
  //     const response = await fetch("https://api.github.com/users/theeuzin13")
  //     const data = await response.json();
  //     setUser({
  //       name: data.name,
  //       avatar: data.avatar_url,
  //     });
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        //foi criado um evento aqui para pegar o que esta sendo escrito no input e armazenar em setStudentName
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      {/* como students e uma lista usa se o map para percorrer todos estudantes da lista */}
      {/* foi usado uma arrow function que para cada estudante ele renderiza um card */}
      {/* essas props foram criadas como um objeto para serem adicionadas no card */}
      {/* e preciso usar uma chave, para os elementos que vao ser gerado atraves de uma estrutura de repeticao e essa chave tem que ser unica, usei o tempo aqui para estudo, mas o ideal mesmo e usar um id, porque o tempo aqui apesar de conter varios digitos uma hora pode repetir */}
      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}
