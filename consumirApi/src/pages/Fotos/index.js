import React, { useState } from "react";
import { get, set } from "lodash";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { Container } from "../../styles/GlobalStyles";
import Loading from "../../components/Loading";
import { Title, Form } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, "params.id", "");

  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState("");

  React.useEffect(() => {
    const getData = async () => {
      try{
        setIsLoading(true);
        const {data} = await axios.get(`/alunos/${id}`);
        setFoto(get(data, "Fotos[0].url", ""));
        setIsLoading(false);
      }catch(e){
        toast.error("Erro ao buscar foto");
        setIsLoading(false);
        history.push("/");
      }
    }

    getData();
  }, []);

  const handleChange = async e => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);
    setFoto(fotoURL);

    const formData = new FormData();
    formData.append("aluno_id", id);
    formData.append("foto", file);

    try{
      setIsLoading(true);
      await axios.post("/fotos/", formData,{
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      });
      toast.success("Foto enviada com sucesso");
      setIsLoading(false);
    }catch(e){
      setIsLoading(true);
      const status = get(e,"response.status",0);
      if(status == 401) dispatch(actions.loginFailure());
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>
      <Form>
        <label htmlFor="foto">
          {foto 
            ? <img crossOrigin="" src={foto} alt="Foto" /> 
            : "Selecionar"
          }
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
}