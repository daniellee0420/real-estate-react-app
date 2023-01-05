import { USER_FIELDS } from '../../common/fields';
import { ROLES_ENUM } from '../../common/enums';
import { useState } from 'react';
import InputFormRow from '../../common/InputFormRow';
import { hostUrl } from '../../common/urls';
import FormSubmitButton from '../../common/FormSubmitButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUpPage() {
    const [userInfo, setUserInfo] = useState({
        role: ROLES_ENUM.user,
    });
    const navigate = useNavigate();

    const postHome = async () => {
        try {
            const data = await fetch(`${hostUrl}/user`, {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (data) {
                navigate('/');
                toast.success('Successful Sign up!', { autoClose: 300, pauseOnHover: false });
            }
        } catch (err) {
            toast.error(`Something went wrong! ${err}`, { autoClose: 300, pauseOnHover: false });
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        postHome();
    };

    const handleOnChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                {USER_FIELDS.map((uf) => (
                    <InputFormRow
                        key={uf.labelName}
                        labelName={uf.labelName}
                        name={uf.name}
                        value={userInfo[uf.name]}
                        handleOnChange={handleOnChange}
                    />
                ))}
                <article className="form-row">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={userInfo.password || ''}
                        onChange={handleOnChange}
                    />
                </article>
                <FormSubmitButton />
            </form>
        </div>
    );
}
