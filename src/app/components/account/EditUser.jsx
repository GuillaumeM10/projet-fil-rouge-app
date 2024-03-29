import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../setup/contexts/UserContext';
import Step2 from '../auth/signUp/Step2';
import Step4 from '../auth/signUp/Step4';
import Step3 from '../auth/signUp/Step3';
import { AuthContext } from '../../../setup/contexts/AuthContext';
import toast from "react-hot-toast";
import UserDetailService from '../../../setup/services/userDetail.service';
import TokenService from '../../../setup/services/token.service';
import FunctionsService from '../../../setup/services/functions.service';
import UserService from '../../../setup/services/user.service';
import ReCAPTCHA from "react-google-recaptcha";
import Loading from '../ui/Loading';

const EditUser = () => {
  const { user } = useContext(UserContext);
  const { setCredentials, credentials, handleChange } = useContext(AuthContext);
  const [ displayedError, setDisplayedError ] = useState(null);
  const [ sending, setSending ] = useState(false);
  const [tabs, setTabs] = useState('personnal');
  const recaptchaRef = useRef(null);

  const handleSubmitUserDetails = async (e) => {
    e.preventDefault();
    setSending(true);

    if(credentials.lastName 
      || credentials.firstName 
      || credentials.email 
      || credentials.password 
      || credentials.passwordConfirm 
    ){
      let userOnly = {
        lastName: credentials.lastName,
        firstName: credentials.firstName,
        email: credentials.email,
        password: credentials.password,
        passwordConfirm: credentials.passwordConfirm
      };
      try{
        const token = await recaptchaRef.current.executeAsync();
        let userId = TokenService.getUserInToken();
        userId = userId.id
        await UserService.update(userId, {...userOnly, token})
      }catch(e){
        toast.error("Une erreur est survenue lors de la mise à jour de votre profil.");
        setDisplayedError(e.response.data.message);
        console.log(e);
        setSending(false);
      }
    }

    if(credentials.userDetail.files && FunctionsService.filesSizeCheck(credentials.userDetail.files, false, 10000000, setSending) === false) return
    if(credentials.userDetail.banner && FunctionsService.filesSizeCheck(credentials.userDetail.banner, false, 2000000, setSending, `La taille totale de la banner ne doit pas dépasser 2mo`) === false) return
    if(credentials.userDetail.cv && FunctionsService.filesSizeCheck(credentials.userDetail.cv, false, 2000000, setSending, `La taille totale du cv ne doit pas dépasser 2mo`) === false) return
    if(credentials.userDetail.personalPicture && FunctionsService.filesSizeCheck(credentials.userDetail.personalPicture, false, 2000000, setSending, `La taille totale de la photo de profile ne doit pas dépasser 2mo`) === false) return

    try{
      // get user from local storage
      const token = await recaptchaRef.current.executeAsync();
      let userDetailId = TokenService.getUserInToken();
      userDetailId = userDetailId.userDetail
      await UserDetailService.update(userDetailId, {...credentials.userDetail, token})
      toast.success("Votre profil a bien été mis à jour !");
      setTimeout(() => {
        // navigate('/account');
        setSending(false);
      }, 1000);
    }catch(e){
      toast.error("Une erreur est survenue lors de la mise à jour de votre profil.");
      setDisplayedError(e);
      console.log(e);
      setSending(false);

    }
  }

  useEffect(() => {
    setCredentials({ ...credentials, userDetail: user.userDetail })
  }, [user.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="editUser">
      <div className="tabs buttons">
          <button
            type='button'
            onClick={() => setTabs("personnal")}
            className={"personnal " + (tabs === "personnal" ? "active" : "")}
          >
            Personnel
          </button>

          <button
            type='button'
            onClick={() => setTabs("professionnal")}
            className={"professionnal " + (tabs === "professionnal" ? "active" : "")}
          >
            Professionnel
          </button>

          <button
            type='button'
            onClick={() => setTabs("myDocs")}
            className={"myDocs " + (tabs === "myDocs" ? "active" : "")}
          >
            Mes documents
          </button>

      </div>

      <form 
        className="mainform"
        onSubmit={handleSubmitUserDetails}
      >

        {!sending ? (
          <>
            {tabs === "personnal" && (
              <Step2 handleChange={handleChange} credentials={credentials} />
              )}

            {tabs === "professionnal" && (
              <Step3 handleChange={handleChange} credentials={credentials}/>
              )}

            {tabs === "myDocs" && (
              <Step4 handleChange={handleChange} credentials={credentials} />
              )}
          
            {tabs !== "" && <button type="submit">Valider</button>}
            
            { displayedError && <div className="error">{ displayedError }</div> }
          </>
        ) : (
          <div>
            <Loading />
          </div>
        )}
        <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey="6Le63w8nAAAAAHU3HO5ks3Cg-6rGg4_T6_L4T6bF"
            hidden={true}
        />
      </form>
    </div>
  );
};

export default EditUser;