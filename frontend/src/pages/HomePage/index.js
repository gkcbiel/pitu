import React from "react";
import Header from "../../Components/Header"; // eslint-disable-next-line
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap"; // eslint-disable-next-line
import { ContentContainer, Form, AdsBlock } from "./styles";
import ShortenerService from "../../services/shortenerService";

class HomePage extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      url: "",
      code: "",
      errorMessage: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { url } = this.state;

    this.setState({ isLoading: true, errorMessage: "" });

    if (!url) {
      this.setState({
        isLoading: false,
        errorMessage: "Informe uma url para encurtar",
      });
    } else {
      try {
        const service = new ShortenerService();
        const result = await service.generate({ url });

        this.setState({ isLoading: false, code: result.code });
      } catch (error) {
        this.setState({
          isLoading: false,
          errorMessage: "Ops, ocorreu um erro ao tentar encurtar a url.",
        });
      }
    }
  };

  copyToClipboard = () => {
    const element = this.inputURL;
    element.select();
    document.execCommand('Copy');
  }

  render() {
    const { isLoading, errorMessage, code } = this.state;

    return (
      <Container>
        <Header>Seu novo encurtador de URL. :)</Header>
        <ContentContainer>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3" >
              <FormControl
                placeholder="Digite a url para encurtar"
                defaultValue=""
                onChange={(e) => this.setState({ url: e.target.value })}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  Encurtar
                </Button>
              </InputGroup.Append>
            </InputGroup>

            {isLoading ? (
              <Spinner animation="border" />
            ) : (
              code && (
                <>
                  <InputGroup className="mb-3">
                    <FormControl
                      autoFocus={true}
                      defaultValue={`http://pitu.tk/${code}`}
                      onChange={(e) => this.setState({ url: e.target.value })}
                      ref={(input) => this.inputURL = input}
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={() => this.copyToClipboard()}  >
                        Copiar
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <p>Para acompanhar as estatíscas, acesse http://pitu.tk/{code}</p>
                </>
              )
            )}
            {errorMessage && <Alert variant="danger" >{errorMessage}</Alert> }
          </Form>
        </ContentContainer>
        <ContentContainer>
          <AdsBlock>Adsense</AdsBlock>
        </ContentContainer>
      </Container>
    );
  }
}

export default HomePage;
