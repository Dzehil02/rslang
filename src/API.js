
export async function getWords(numberGroup, numberPage) {
    this.setState({loading: true});
    const response = await fetch(`https://learn-words-task.herokuapp.com/words?page=${this.state.currentPage}&group=${numberGroup}`)
    const commit = await response.json();
    this.setState({loading: false, character: commit})
}