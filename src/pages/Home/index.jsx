//useState e o hook que permite criar estados
import React, { useState } from "react";

import "./style.css";
import { Card } from "../../components/Card";

export function Home() {
  //o primeiro elemento do vetor e para guardar o conteudo do estado e o segundo elemento e a funcao que atualiza esse estado, para diferenciar o primeiro do segundo usa se um set

  // o que esta atualizando esse setStudenteName e o input
  const [studentName, setStudentName] = useState("");

  //esse estado e para armazenar os estudantes da lista de presenca
  const [students, setStudents] = useState([]);

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

  return (
    <div className="container">
      <h1>Lista de Presença</h1>
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
