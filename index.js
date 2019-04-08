function createStore () {
  // the store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. update the state

  let state

  const getState = () => state
  
  return {
    getState
  }
}
