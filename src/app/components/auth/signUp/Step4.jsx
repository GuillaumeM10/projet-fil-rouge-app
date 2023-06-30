import React from 'react';
import PreviewFiles from '../../PreviewFiles/PreviewFiles';

const Step4 = ({ handleChange, credentials}) => {
  return (
    <div className="step step4">
      <h2>Mes documents</h2>

      {/* cv */}
      <div className="formGroup file">
        <input
          type="file"
          name="cv"
          accept=".pdf,.png,.jpg,.jpeg"
          size={10}
          placeholder="CV"
          onChange={(e) => {
            handleChange(e)
            console.log(e.target.name);
          }}
        />
        <label 
          htmlFor="cv"
          onClick={(e) => {
            e.target.parentNode.querySelector('input').click()
          }}  
        >CV</label>
        <p>
          <small>Formats acceptés : pdf, png, jpg, jpeg</small>
        </p>
        <p>
          <small>Max : 10 Mo</small>
        </p>
        {credentials?.userDetail?.cv && credentials?.userDetail?.cv.length > 0 && (
          <PreviewFiles files={credentials?.userDetail?.cv} />
        )}
        {credentials?.userDetail?.cv && credentials?.userDetail?.cv.Location && (
          <PreviewFiles files={[credentials?.userDetail?.cv]} />
        )}
      </div>

      {/* personalPicture */}
      <div className="formGroup file">
        <input
          type="file"
          name="personalPicture"
          accept=".png,.jpg,.jpeg"
          size={10000000}
          placeholder="Photo de profil"
          onChange={(e) => {
            handleChange(e)
            console.log(e.target.name);
          }}
        />
        <label 
          htmlFor="personalPicture"
          onClick={(e) => {
            e.target.parentNode.querySelector('input').click()
          }}
        >Photo de profil</label>
        <p>
          <small>Formats acceptés : png, jpg, jpeg</small>
        </p>
        {credentials?.userDetail?.personalPicture && credentials?.userDetail?.personalPicture.length > 0 && (
          <PreviewFiles files={credentials?.userDetail?.personalPicture} />
        )}
        {credentials?.userDetail?.personalPicture && credentials?.userDetail?.personalPicture.Location && (
          <PreviewFiles files={[credentials?.userDetail?.personalPicture]} />
        )}
      </div>

      {/* banner */}
      <div className="formGroup file">
        <input
          type="file"
          name="banner"
          size={10000000}
          accept=".png,.jpg,.jpeg"
          placeholder="Bannière"
          onChange={(e) => {
            handleChange(e)
            console.log(e.target.name);
          }}
        />
        <label 
          htmlFor="banner"
          onClick={(e) => {
            e.target.parentNode.querySelector('input').click()
          }}
        >Bannière</label>
        <p>
          <small>Formats acceptés : png, jpg, jpeg</small>
        </p>
        <p>
          <small>Max : 10 Mo</small>
        </p>
        {credentials?.userDetail?.banner && credentials?.userDetail?.banner.length > 0 && (
          <PreviewFiles files={credentials?.userDetail?.banner} />
        )}
        {credentials?.userDetail?.banner && credentials?.userDetail?.banner.Location && (
          <PreviewFiles files={[credentials?.userDetail?.banner]} />
        )}
      </div>

      {/* files */}
      <div className="formGroup file">
        <input
          type="file"
          name="files"
          multiple
          size={10000000}
          accept=".pdf,.png,.jpg,.jpeg,.mp3,.aac,.wav,.mp4,.mkv"
          placeholder="Autres fichiers"
          onChange={(e) => {
            handleChange(e)
            console.log(e.target.name);
          }}
        />
        <label 
          htmlFor="files"
          onClick={(e) => {
            e.target.parentNode.querySelector('input').click()
          }}
        >Autres fichiers</label>
        <p>
          <small>Formats acceptés : pdf, png, jpg, jpeg, mp3, aac, waw, mp4, mkv</small>
        </p>
        <p>
          <small>Max : 10 Mo</small>
        </p>
        {credentials?.userDetail?.files && credentials?.userDetail?.files.length > 0 && (
          <PreviewFiles isSwiper={true} files={credentials?.userDetail?.files} />
        )}
      </div>

      {/* displayedOnFeed */}
      <label className="checkboxContainer" htmlFor="displayedOnFeed">
        <span>
          Etre affiché dans le feed (oui par défaut)
        </span>
      
        <span className="animation">

          <input
            type="checkbox"
            name="displayedOnFeed"
            placeholder="Je souhaite être visible sur le feed"
            defaultChecked={true}
            id='displayedOnFeed'
            onChange={(e) => {
              handleChange(e)
            }}
          />
          <span className="handle"></span>
        </span>
      </label>
      
    </div>
  );
};

export default Step4;