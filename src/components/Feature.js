import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
    
    const {searchTerm, searchValue, setIsLoading, setSearchResults} = props;

    return <span className="content">
    <a href="#" onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true);
  
          try{
              const response = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue)
              setSearchResults(response)
          }catch(err) {
              console.log('It is a little off bro, check Feature.js')
          }

          setIsLoading(false)
    }}>{searchTerm}</a>
    </span>
}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = (props) => {

    const {featuredResult} = props;
    

    if(!featuredResult) {
        return <main id="feature"></main>
    }
    const{title, dated, images, primaryimageurl, description, culture, style, technique, medium, dimensions,people, department, divisions, contact, creditline} = featuredResult
    
        return(
         <main id="feature">
        <div className="object-feature">
            <header>
                <h3>OBJECT TITLE</h3>
                <h4>WHEN IT IS DATED</h4>
            </header>
            <section className="facts">
            { title? <>
                <span className="title">title</span>
                <span className="content">{title}</span>  
              </> : null
            }
            { dated? <>
                <span className="title">dated</span>
                <span className="content">{dated}</span>  
              </> : null
            }
            { description? <>
                <span className="title">description</span>
                <span className="content">{description}</span>  
              </> : null
            }
            { culture? <>
                <span className="title">culture</span>
                <span className="content">{culture}</span>  
              </> : null
            }
            { style? <>
                <span className="title">style</span>
                <span className="content">{style}</span>  
              </> : null
            }
            { medium? <>
                <span className="title">medium</span>
                <span className="content">{medium}</span>  
              </> : null
            }
            { technique? <>
                <span className="title">technique</span>
                <span className="content">{technique}</span>  
              </> : null
            }
            { dimensions? <>
                <span className="title">dimensions</span>
                <span className="content">{dimensions}</span>  
              </> : null
            }
            { people? <>
                <span className="title">people</span>
                {people.map(peeps => <span className="content" key={peeps.id}>{peeps.displayname}</span>)}
              </> : null
            }
            { department? <>
                <span className="title">department</span>
                <span className="content">{department}</span>  
              </> : null
            }
            { divisions? <>
                <span className="title">divisions</span>
                <span className="content">{divisions}</span>  
              </> : null
            }
            { contact? <>
                <span className="title">contact</span>
                <span className="content">{contact}</span>  
              </> : null
            }
            { creditline? <>
                <span className="title">creditline</span>
                <span className="content">{creditline}</span>  
              </> : null
            }
            </section>
            <section className="photos">
                {images? <img src={primaryimageurl} /> : <></>}
            </section>
        </div>
    </main>)}

export default Feature;