import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../setup/contexts/UserContext';
import Step2 from '../auth/signUp/Step2';
import Step4 from '../auth/signUp/Step4';
import Step3 from '../auth/signUp/Step3';
import { AuthContext } from '../../../setup/contexts/AuthContext';
import toast, { Toaster } from "react-hot-toast";
import UserDetailService from '../../../setup/services/userDetail.service';
import TokenService from '../../../setup/services/token.service';

const EditUser = () => {
  const { user, setUser } = useContext(UserContext);
  const { setCredentials, credentials, handleChange } = useContext(AuthContext);
  const [ displayedError, setDisplayedError ] = useState(null);
  const [ sending, setSending ] = useState(false);
  const [tabs, setTabs] = useState('');

  const handleSubmitUserDetails = async (e) => {
    e.preventDefault();
    setSending(true);

    try{
      // get user from local storage
      let userDetailId = TokenService.getUserInToken();
      userDetailId = userDetailId.userDetail
      await UserDetailService.update(userDetailId, credentials.userDetail)
      toast.success("Votre profil a bien été mis à jour !");
      setTimeout(() => {
        // navigate('/account');
        setSending(false);
      }, 1000);
    }catch(e){
      toast.error("Une erreur est survenue lors de la mise à jour de votre profil.");
      console.log(e);
      setSending(false);

    }
  }

  useEffect(() => {
    setCredentials({ ...credentials, userDetail: user.userDetail })
  }, [user.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="editUser">
      <p>Edit profil</p>

      <div className="tabs buttons">
          <button
            onClick={() => setTabs("personnal")}
            className={"personnal " + (tabs === "personnal" ? "active" : "")}
          >
            Personnel
          </button>

          <button
            onClick={() => setTabs("professionnal")}
            className={"professionnal " + (tabs === "professionnal" ? "active" : "")}
          >
            Professionnel
          </button>

          <button
            onClick={() => setTabs("myDocs")}
            className={"myDocs " + (tabs === "myDocs" ? "active" : "")}
          >
            Mes documents
          </button>

      </div>

      <form onSubmit={handleSubmitUserDetails}>

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
            <img className='loading' src="/img/loading.svg" alt="" />
          </div>
        )}

      </form>

      <Toaster />
    </div>
  );
};

export default EditUser;