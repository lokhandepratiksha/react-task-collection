import { useState } from "react";

const ContactForm = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error , setError] = useState('');
    const [thankYou, setThankYou] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) =>{

        e.preventDefault();
        let errorMessage = '';
        if(name.trim() === '') {
            errorMessage += 'Name is required\n';
        }
        if(email.trim() === '') {
            errorMessage += 'Email is required\n';
        }
        else if(!/\S+@\S+\.\S+/.test(email)) {
            errorMessage += 'Email is invalid\n';
        }
        if(message.trim() === '') {
            errorMessage += 'Message is required\n';
        }
        setError(errorMessage);

        // ✅ Only show Thank You if no errors
        if (Object.keys(errorMessage).length === 0) {
            setThankYou(true);

            // Optional: clear form
            //setName('');
            setEmail('');
            setMessage('');
        } else {
            setThankYou(false);
        }
    }

    const ThankYouPopUp = ({ name }) => {
        return (
            <h3>Thank you, {name}</h3>
        )

    }


    return (

        <>
         <div className="form-container">
            {thankYou  ? <ThankYouPopUp name={name} /> :  <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name" className="form-lable">Name</label>
                <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                {error.includes('Name is required') && <p className="text-danger">Name is required</p>}

            </div>
            <div className="form-group">
                <label htmlFor="email" className="form-lable">Email</label>
                <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                {error.includes('Email is required') && <p className="text-danger">Email is required</p>}
            </div>
            <div className="form-group">
                <label htmlFor="message" className="form-lable">Message</label>
                <textarea id="message" className="form-control" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
                {error.includes('Message is required') && <p className="text-danger">Message is required</p>}
            </div>
            <div className="btn-div">
                <button  className="btn btn-primary">
                    Submit
                </button>
            </div>
         </form>
    }
         </div>
        </>
    )

}
export default ContactForm