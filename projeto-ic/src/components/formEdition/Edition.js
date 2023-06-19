import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import * as uuid from "uuid"
import {
  Container,
  Input, Label, Button, Card, CardBody, CardTitle
} from 'reactstrap';
import PreviewForm from './PreviewForm';
import { AiFillCloseCircle } from "react-icons/ai";
import styles from  './Edition.module.css'
function Edition() {
  const [inputs, setInputs] = useState([
    {
      id: uuid.v4(),
      type: "select",
      labelText: "",
      options: []
    }
  ]);

  const [formData, setFormData] = useState({});

  const addField = () => {
    setInputs([...inputs, {
      id: uuid.v4(),
      type: "select",
      labelText: "",
      options: []
    }]);
  };

  const showData = async (formData) => {
    console.log(formData);
  };

  const handlerDataEachField = (index, key, value) => {
    const fields = [...inputs];
    fields[index][key] = value;
    setInputs(fields);
  };

  const handlerDataEachOption = (indexParent, indexOption, value) => {
    const fields = [...inputs];
    fields[indexParent].options[indexOption] = { id: uuid.v4(), value, label: value };
    setInputs(fields);
  };

  const deleteField = (index) => {
    const fields = [...inputs];
    fields.splice(index, 1);
    setInputs(fields);
  };

  const deleteFieldOption = (indexParent, indexOption) => {
    const fields = [...inputs];
    fields[indexParent].options.splice(indexOption, 1);
    setInputs(fields);
  };

  const addOptionToSpecificField = (index) => {
    const fields = [...inputs];
    fields[index].options.push({ value: "", label: "" });
    setInputs(fields);
  };

  const isExistInputs = () => {
    return inputs.length > 0;
  };

  const renderOptions = (item, index) => {
    return (

      <div className= {styles.adicionarCampo}>

        <center>
          <Button onClick={() => addOptionToSpecificField(index)}>
            Adicionar opção
          </Button>

          {item.options.map((option, indexOption) => {
            return (
              <>

                <div className= {styles.options}>
                  <Input
                    value={option.value}
                    onChange={(event) => handlerDataEachOption(index, indexOption, event.target.value)}
                  />
                  <Button onClick={() => deleteFieldOption(index, indexOption)}>Remover</Button>
                </div>

              </>
            );
          })}
        </center>

      </div>
    );
  };

  const getKeyField = (label) => {
    return label.replace(/[?]/g, "").replace(/\s/g, "_").toLowerCase();
  };

  const handlerFormData = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  return (
    <Container>

      <div className={styles.form}>

        <div className= {styles.cabecalho}>

          <center>
            <Button onClick={addField}>Adicionar pergunta</Button>&nbsp;
            <Button onClick={showData}>Salvar</Button>
          </center>

        </div>
        {isExistInputs() &&
          inputs.map((item, index) => {
            return (

              <Card className="mb-2" key={item.id}>
                <CardTitle tag="h5" >
                  
                  <div className= {styles.topo}>
                    <Button onClick={() => deleteField(index)}>
                      <AiFillCloseCircle />
                    </Button>
                  </div>
                
                </CardTitle>
                <CardBody>

                  <div className = {styles.group}>
                    <Label for="exampleEmail">
                      Qual a pergunta?
                    </Label>
                    <Input
                      id="label"
                      name="text"
                      type="text"
                      value={item.labelText}
                      onChange={(event) => handlerDataEachField(index, "labelText", event.target.value)}
                    />
                  </div>

                  {renderOptions(item, index)}
                </CardBody>
              </Card>
            );
          })}
      </div>
   
      <div className={styles.group}>
        <h1>Previsão do Formulário</h1>
        <PreviewForm
          inputs={inputs}
          formData={formData}
          getKeyField={getKeyField}
          handlerFormData={handlerFormData}
        />
      </div>
    </Container>
  );
}

export default Edition;
