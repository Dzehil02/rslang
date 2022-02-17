
export async function getWords(numberGroup, numberPage) {
    this.setState({loading: true});
    const response = await fetch(`https://learnwords-reslang.herokuapp.com/words?page=${this.state.currentPage}&group=${numberGroup}`)
    const commit = await response.json();
    this.setState({loading: false, character: commit})
}

export const createUser = async user => {
  try {
    const rawResponse = await fetch('https://learnwords-reslang.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const content = await rawResponse.json();
    console.log(content);
  } catch (err) {
    console.log('Некорректный логин или пароль')
  }
  
  };

// createUser({ "email": "hello22@user.com", "password": "Gfhjkm_12322" });

export const loginUser = async user => {
  try {
    const rawResponse = await fetch('https://learnwords-reslang.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const content = await rawResponse.json();

    return content;
  } catch (err) {
    console.log('Аккаунт не найден. Проверьте логин и пароль или выполните регистрацию')
  }
    
  };
  
//   loginUser({ "email": "hello22@user.com", "password": "Gfhjkm_12322" });

export const getUserId = async ({ userId, token }) => {
  try {
    const rawResponse = await fetch(`https://learnwords-reslang.herokuapp.com/users/${userId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content = await rawResponse.json();

    return content;
  } catch (e) {
    console.log('Пользователь не найден.')
  }

};

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDU5MzNhMjM4YTI2MDAxNjI4N2RjNyIsImlhdCI6MTY0NDUzMjY0MCwiZXhwIjoxNjQ0NTQ3MDQwfQ.0JBzCgjy1bS0Z7xTVGcqOJ5QEpMGKBZ-iynHmBMKJ5s';

  const createUserWord = async ({ userId, wordId, word }) => {
    const rawResponse = await fetch(`https://learnwords-reslang.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });
    const content = await rawResponse.json();
  
    console.log(content);
  };
  
//   createUserWord({
//     userId: "6205933a238a260016287dc7",
//     wordId: "5e9f5ee35eb9e72bc21af714",
//     word: { "difficulty": "weather", "optional": {testFieldString: 'test', testFieldBoolean: false} }
//   });

//   Console: {
//     "id":"5ec9a92acbbd77001736b167",
//     "difficulty":"weak",
//     "optional":{
//       "testFieldString":"test",
//       "testFieldBoolean":true
//     },
//     "wordId":"5e9f5ee35eb9e72bc21af716"
//   }
  
  const getUserWord = async ({ userId, wordId }) => {
    const rawResponse = await fetch(`https://learnwords-reslang.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content = await rawResponse.json();
  
    console.log(content);
  };
  
//   getUserWord({
//     userId: "6205933a238a260016287dc7",
//     wordId: "5e9f5ee35eb9e72bc21af714"
//   });

//   Console: {
//     "id":"5ec9a92acbbd77001736b167",
//     "difficulty":"weak",
//     "optional":{
//       "testFieldString":"test",
//       "testFieldBoolean":true
//     },
//     "wordId":"5e9f5ee35eb9e72bc21af716"
//   }