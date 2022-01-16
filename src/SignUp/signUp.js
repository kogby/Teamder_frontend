import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@mui/icons-material/Send';
import instance from '../instance';
import Title from '../Component/Title';
import Wrapper from '../Component/Wrapper';
import ContentBox from '../Component/ContentBox';
import styled from 'styled-components';
const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 70%;
    margin: 2px;
`;
const Div = styled.div`
    width: 20%;
    display:flex;
    margin: 1em;
`;
const TextDiv = styled.div`
    width: 40%;
    display:flex;
    margin: 1em;
`;
const SignUp = (props) =>{
    const [email, setEmail] = useState("");
    const [name,setName] = useState("");
    const [passward , setPassward] = useState("");
    const [fbLink , setFbLink] = useState("");
    const handleChange = (func) => (event) => {
        func(event.target.value);
    };

    const handleSubmit = async() => {
        if(!email || !name || !passward || !fbLink){
            props.displayAlert("error" , "Please fill in all infomation!")
            return;
        }
        else{
            const {
                data: {message},
            } = await instance.post('/signUp/createUser',{
                email,
                name,
                passward,
                fbLink
            });
            setTimeout(() => {
            props.navigate(-1);
            }, 300)
        }
    }


    return (
        <Wrapper>
            <Title>
                <Typography variant="h4" style={{ color: 'white' }}>
                    <h1>Sign Up</h1>
                </Typography>
            </Title>
            <ContentBox>
                <Row>
                    <Div>
                        <Typography style={{ color: '#212121' }}>Email</Typography>
                    </Div>
                    <TextDiv>
                        <TextField
                            placeholder="Email"
                            value={email}
                            onChange={handleChange(setEmail)}
                        ></TextField>
                    </TextDiv>
                </Row>
                <Row>
                    <Div>
                        <Typography  style={{ color: '#212121' }}>Name</Typography>
                    </Div>
                    <TextDiv>
                        <TextField
                            placeholder="Name"
                            value={name}
                            onChange={handleChange(setName)}
                        ></TextField>
                    </TextDiv>
                </Row>
                <Row>
                    <Div>
                        <Typography style={{ color: '#212121' }}>Passward</Typography>
                    </Div>
                    <TextDiv>
                        <TextField
                            placeholder="Passward"
                            value={passward}
                            onChange={handleChange(setPassward)}
                        ></TextField>
                    </TextDiv>
                </Row>
                <Row>
                    <Div>
                        <Typography  style={{ color: '#212121' }}>FB Link</Typography>
                    </Div>
                    <TextDiv>
                        <TextField
                            placeholder="FB Link"
                            value={fbLink}
                            onChange={handleChange(setFbLink)}
                        ></TextField>
                    </TextDiv>
                </Row>
                <Row>
                    <Button endIcon={<SendIcon />}onClick={handleSubmit}  variant="contained" color="primary">Submit</Button>
                </Row>
            </ContentBox>
        </Wrapper>
    )
}
export default SignUp; 