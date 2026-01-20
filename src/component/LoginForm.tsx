import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginForm() {

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>名前</Form.Label>
          <Form.Control type="text" placeholder="名前" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>年齢</Form.Label>
          <Form.Control type="number" placeholder="年齢" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>性別</Form.Label>
          <br />
          {[
            { value: 'male', label: '男性' },
            { value: 'female', label: '女性' },
            { value: 'other', label: 'その他' }
          ].map((gender) => (
            <Form.Check
              key={gender.value}
              inline
              label={gender.label}
              name="gender"
              type="radio"
              id={`gender-${gender.value}`}
              value={gender.value}
            />
          ))}
        </Form.Group>

        <Button variant="primary" type="submit">
          登録する
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;