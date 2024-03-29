import React, { useState } from 'react';
import FunctionsService from '../../../../../setup/services/functions.service';
import Select from 'react-select';

const Experiences = ({
  setExperiences,
  experiences,
}) => {
  const [currentExperience, setCurrentExperience] = useState({
    "actualyIn": false,
    "type": "stage",
    "startDate": null,
    "endDate": null,
  });

  const handleChangeExperiences = (e) => {
    let { name, value } = e.target;
    const oldExperiences = currentExperience;

    if(name === "actualyIn") value = e.target.checked === true ? true : false;
    if(name === 'startDate' || name === 'endDate') value = new Date(value);
    setCurrentExperience({ ...oldExperiences, [name]: value });
  }

  const removeExperience = (e, index) => { 
    e.preventDefault();
    let oldExperiences = experiences;
    
    setExperiences({
      ...oldExperiences,
      "target": {
        "name": "experiences",
        "value": [
          ...oldExperiences.target.value.slice(0, index),
          ...oldExperiences.target.value.slice(index + 1)
        ]
      }
    });
  }

  const addExperience = (e) => {
    const oldExperiences = experiences;

    if( // if the experience is already in the list
      (
        !currentExperience.companieName
        && !currentExperience.jobName
      )
      || (
        experiences.target.value.find((experience) => experience.companieName === currentExperience.companieName)
        && experiences.target.value.find((experience) => experience.jobName === currentExperience.jobName)
        && experiences.target.value.find((experience) => experience.startDate === currentExperience.startDate)
        && experiences.target.value.find((experience) => experience.endDate === currentExperience.endDate)
        && experiences.target.value.find((experience) => experience.actualyIn === currentExperience.actualyIn)
        && experiences.target.value.find((experience) => experience.type === currentExperience.type)
      )
    ) return;

    if( // if the experience is already in the list but with different startDate or endDate or actualyIn or type
      (
        experiences.target.value.find((experience) => experience.companieName === currentExperience.companieName)
        && experiences.target.value.find((experience) => experience.jobName === currentExperience.jobName)
      )
      && (
        experiences.target.value.find((experience) => experience.startDate !== currentExperience.startDate)
        || experiences.target.value.find((experience) => experience.endDate !== currentExperience.endDate)
        || experiences.target.value.find((experience) => experience.actualyIn !== currentExperience.actualyIn)
        || experiences.target.value.find((experience) => experience.type !== currentExperience.type)
      )
    ){
      const experience = experiences.target.value.find((experience) => experience.companieName === currentExperience.companieName);
      const index = experiences.target.value.indexOf(experience);
      experiences.target.value[index] = currentExperience;
      setExperiences({
        ...oldExperiences,
        "target": {
          "name": "experiences",
          "value": [
            ...oldExperiences.target.value,
          ]
        }
      });
      return;
    }

    setExperiences({
      ...oldExperiences,
      "target": {
        "name": "experiences",
        "value": [
          ...oldExperiences.target.value,
          currentExperience
        ]
      }
    });
  }


  return (
    <div className="experiences">
      {/* companieName */}
      <div className="formGroup companieName">

        <label htmlFor="companieName">Nom de l'entreprise</label>
        <input
          type="text"
          name="companieName"
          placeholder="Nom de l'entreprise"
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeExperiences(e)
          }}
          />

      </div>

      {/* jobName */}
      <div className="formGroup jobName">

        <label htmlFor="jobName">Nom du poste</label>
        <input
          type="text"
          name="jobName"
          placeholder="Nom du poste"
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeExperiences(e)
          }}
          />

      </div>

      {/* startDate */}
      <div className="formGroup startDate">

        <label htmlFor="startDate">Date de début</label>
        <input
          type="date"
          name="startDate"
          placeholder="Date de début"
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeExperiences(e)
          }}
          />

      </div>

      {/* endDate */}
      <div className="formGroup endDate">
        
        <label htmlFor="endDate">Date de fin</label>
        <input
          type="date"
          name="endDate"
          placeholder="Date de fin"
          onChange={(e) => {
            FunctionsService.labelDisplay(e)
            handleChangeExperiences(e)
          }}
          />

      </div>

      {/* type */}
      <div className="formGroup type">
        <label htmlFor="type">Type du poste</label>
        <Select 
          name="type"
          placeholder="Type du poste"
          onChange={(e) => {
            handleChangeExperiences({ target : { name: "type", value: e.value }})
          }}
          styles={FunctionsService.reactSelectCustomStyles()}
          options={[
            { value: "Stage", label: "Stage" },
            { value: "Alternance", label: "Alternance" },
            { value: "CDD", label: "CDD" },
            { value: "CDI", label: "CDI" },
            { value: "Freelance", label: "Freelance" },
            { value: "Bénévolat", label: "Bénévolat" },
            { value: "Autre", label: "Autre" }
          ]}
        />
      </div>

      {/* actualyIn */}

        <label className="checkboxContainer formGroup actualyIn" htmlFor="actualyIn">
          <span>
            Actuellement en poste
          </span>
        
          <span className="animation">

            <input
              type="checkbox"
              name="actualyIn"
              placeholder="Je souhaite être visible sur le feed"
              id='actualyIn'
              onChange={(e) => {
                handleChangeExperiences(e)
              }}
            />
            <span className="handle"></span>
          </span>
        </label>


      <button
        type="button"
        className="addButton"
        onClick={(e) => {addExperience(e)}}
      >
        Ajouter
      </button>

      {/* experiences list */}
      {experiences.target.value.length > 0 && (
        <div className="cards">
        {experiences.target.value.map((experience, index) => {
            return (
              <div className='experience' key={index}>
                <p className='companieName'>{experience.companieName}</p>
                {(experience.startDate || experience.endDate) && (
                  <div className="dates">
                    {experience.startDate && !(experience.startDate instanceof Date && !isNaN(experience.startDate)) &&(
                      <p className='date startDate'>Début : <span>{FunctionsService.dateFormater(experience.startDate)}</span></p>
                    )}
                    {experience.endDate && !(experience.endDate instanceof Date && !isNaN(experience.endDate)) &&(
                      <p className='date endDate'>Fin : <span>{FunctionsService.dateFormater(experience.endDate)}</span></p>
                    )}
                  </div>
                )}
                <p className='jobName'>{experience.jobName}</p>

                {(experience.type && (
                  <p className='type'>{experience.type}</p>
                ))}
                <p className={`actualyIn ${experience.actualyIn ? " green" : "" }`}></p>

                <small className='actualyInSmall'>
                  {experience.actualyIn ? (
                    <>
                      <span>*</span>
                      <span className='color green'></span>
                      <span>: Occupe actuellement le post.</span>
                    </>
                  ) : (
                    <>
                      <span>*</span>
                      <span className='color red'></span>
                      <span>: N'occupe plus le post.</span>
                    </>
                  ) }
                </small>
                
                <button 
                  type="button"
                  className='removeButton'
                  onClick={(e) => {removeExperience(e, index)}}
                >X</button>
              </div>
            )
        })}
        </div>
      )}
        
    </div>
  );
};

export default Experiences;