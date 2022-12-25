import './style.css';
import exampleInvitation from '../../assets/exampleInvitation.png';
import explainedProcess1 from '../../assets/explainedProcess1.png';
import explainedProcess2 from '../../assets/explainedProcess2.png';
import explainedProcess3 from '../../assets/explainedProcess3.png';
import explainedProcess4 from '../../assets/explainedProcess4.png';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useStore } from '../../stores/store';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const { eventStore: { setPredicate, predicate } } = useStore();
    const navigate = useNavigate();
    return(
        <div className="homepageContainer">
            <div className="homeHeroSection">
                <h1>Find upcoming <span>EVENTS</span></h1>
                <Formik
                    onSubmit={(values, { resetForm }) => {
                        setPredicate('searchQuery', values.searchQuery);
                        // resetForm();
                        navigate('/events');
                    }}
                    initialValues={{ searchQuery: predicate.get('searchQuery') }}
                >
                    {({ isSubmitting }) => (
                        <Form style={{ width: "92.5%" }}>
                            <Field name="searchQuery">
                                {(props: FieldProps) => (
                                    <input
                                        {...props.field}
                                        placeholder="Search..."
                                        className='homeHeroSectionSearchBox'
                                    />
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="intro">
                <h2>WHO ARE <span className="roze">WE</span>?</h2>

                <img src={exampleInvitation} alt="example invitation" />
            </div>

            <div className="explainedProcess">
                <h2>HOW DOES <span className='roze'>EVENTLY</span> <span className="precrtano">WORK</span> <span className="lila">HELP</span>?</h2>

                <div className="explainedProcessContainer">
                    <div className="explainedProcessItem">
                        <img src={explainedProcess1} alt="explained process 1" />
                        <div className="explainedProcessItemText">
                            <h3>Find events</h3>
                            <p>Find events that you are interested in and add them to your calendar.</p>
                        </div>
                    </div>

                    <div className="explainedProcessItem">
                        <img src={explainedProcess2} alt="explained process 2" />
                        <div className="explainedProcessItemText">
                            <h3>Get notified</h3>
                            <p>Get notified when the event is about to start.</p>
                        </div>
                    </div>

                    <div className="explainedProcessItem">
                        <img src={explainedProcess3} alt="explained process 3" />
                        <div className="explainedProcessItemText">
                            <h3>Join the event</h3>
                            <p>Join the event and enjoy it.</p>
                        </div>
                    </div>

                    <div className="explainedProcessItem">
                        <img src={explainedProcess4} alt="explained process 4" />
                        <div className="explainedProcessItemText">
                            <h3>Share your experience</h3>
                            <p>Share your experience with other users.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="quote lila">
                <p>Life is a collage of event, really.</p>
                <p id='writer' className="roze"> -Mohanlal</p>
            </div>
        </div>
    );
}

export default HomePage;