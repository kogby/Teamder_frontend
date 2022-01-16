import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import instance from '../instance';
import styled from 'styled-components';
import Wrapper from '../Component/Wrapper';
import ContentBox from '../Component/ContentBox'
const Title =styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
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
const  Login = (props)=>{
    const [email, setEmail] = useState("");
    const [passward , setPassward] = useState("");
    const handleChange = (func) => (event) => {
        func(event.target.value);
    };
    const handleLogin = async() => {
        if(!email || !passward){
            props.displayAlert("error" , "Please fill your email and passward!")
            return;
        }
        else{
            console.log(email);
            const {
                data: {pass , message ,userId},
            } = await instance.get('/login/verify',{
                params: {
                  email,
                  passward,
                },
              }
            );
            if(pass === true){
                props.setMyId(userId);
                props.navigate(`/AllPosts`);
                props.setHasSignIn(true);
                props.displayAlert("success" , 'Login success!')
            }
            else{
                props.displayAlert("error" , "User doesn't exist or passward wrong!")
                return;
            }
            console.log(message);
        }
    }
    return (
        <Wrapper>
            <Title>
                <Typography variant="h4" style={{ color: 'white' }}>
                    <h1>Login</h1>
                </Typography>
            </Title>
            <ContentBox>
                <Row>
                    <Div>
                        <Typography  style={{ color: '#212121' }}>Email</Typography>
                    </Div>
                    <TextDiv>
                        <TextField 
                            placeholder="Username"
                            value={email}
                            onChange={handleChange(setEmail)}
                        ></TextField>
                    </TextDiv>
                </Row>
                <Row>
                    <Div>
                        <Typography  style={{ color: '#212121' }}>Passward</Typography>
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
                    <Button size="medium" variant="contained" color="primary" onClick = {handleLogin} style={{margin:5}}>Log in</Button>
                    <Button size="medium" variant="contained" color="primary" onClick={() => props.navigate("/signUp")}>Sign up</Button>
                </Row>
            </ContentBox>
        </Wrapper>
    )
}







export default Login;