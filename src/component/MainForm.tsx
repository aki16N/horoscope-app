import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function MainForm() {
  const zodiac = [
    {value: 'Aries', label: 'おひつじ座'},
    {value: 'Taurus', label: 'おうし座'},
    {value: 'Gemini', label: 'ふたご座'},
    {value: 'Cancer', label: 'かに座'},
    {value: 'Leo', label: 'しし座'},
    {value: 'Virgo', label: 'おとめ座'},
    {value: 'Libra', label: 'てんびん座'},
    {value: 'Scorpius', label: 'さそり座'},
    {value: 'Sagittarius', label: 'いて座'},
    {value: 'Capricornus', label: 'やぎ'},
    {value: 'Aquarius', label: 'みずがめ座'},
    {value: 'Pisces', label: 'うお座'},
  ]

  const [userZodiac, setUserZodiac] = useState('');
  const [rank, setRank] = useState('');
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    console.log(`user is ${userZodiac}`);
    console.log(`rank is ${rank}`);
  }, [rank]);

  function handleClick() {
    if(userZodiac == ''){
      alert('星座を選択してください。');
      return;
    }
    let randomNum = Math.floor(Math.random() * 12) + 1;
    switch (randomNum) {
      case 1:
        setRank('first');
        break;
      case 2:
        setRank('second');
        break;
      case 3:
        setRank('third');
        break;
      case 4:
        setRank('fourth');
        break;
      case 5:
        setRank('fifth');
        break;
      case 6:
        setRank('sixth');
        break;
      case 7:
        setRank('seventh');
        break;
      case 8:
        setRank('eighth');
        break;
      case 9:
        setRank('nineth');
        break;
      case 10:
        setRank('tenth');
        break;
      case 11:
        setRank('eleventh');
        break;
      case 12:
        setRank('twelveth');
        break;
    }

    setShowCard(true);
  }

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

        <Form.Group controlId='zodiac'>
          <Form.Label>星座</Form.Label>
          <Form.Select className="mb-3" onChange={(e) => setUserZodiac(e.target.value)}>
            <option value="">選択してください</option>
            {zodiac.map((z) => (
              <option key={z.value} value={z.value}>{z.label}</option>
            )
            )}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={handleClick} className="mb-3">
          占う
        </Button>
      </Form>

      {showCard ? 
      <Card>
        <Card.Body>You're {rank}</Card.Body>
      </Card> : null}
    </div>
  );
}

export default MainForm;