const initialState = {
  budgets: [],
  fetchingBudgets: false,
  error: null, 
  fetchingTransactions: false,
  totalSpent: 0,
  totalBudget: 0
};


const budget = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_BUDGETS':
    return {
      ...state,
      fetchingBudgets: true
    }

    case 'RECEIVED_BUDGETS':
      console.log('action.budgets', action.budgets);
      var newBudgetTotal = 0;
      for (var i = 0; i <action.budgets.length; i++) {
        newBudgetTotal = newBudgetTotal + action.budgets[i].goalvalue;
      }
      return {
        ...state,
        budgets: action.budgets,
        totalBudget: newBudgetTotal
      };

    case 'FETCH_BUDGETS_ERROR':
      return {
        ...state,
        error: action.error
      };

    case 'FETCHING_TRANSACTION_DATA':
      return {
        ...state,
        fetchingTransactions: true
      }

    case 'RECEIVED_TRANSACTIONS':
      var newArray = state.budgets; 

        for (var category in action.transactions) {
          var found = false;
          for (var i = 0; i < newArray.length; i++) {
            if (category === newArray[i].name) {
              newArray[i].actualvalue = action.transactions[category];
              found = true;
            } 
          }

          if (!found) {
            for (var i =0; i < newArray.length; i++) {
              if (newArray[i] === 'Other') {
                newArray[i].value = newArray[i].value + action.transactions[category];
              }
            }
          }
        }

        var newTotalSpent = 0;
        for (var key in action.transactions) {
          newTotalSpent = newTotalSpent + action.transactions[key];
        }

      return {
        ...state,
        budgets: newArray,
        totalSpent: newTotalSpent
      };

    case 'FETCH_TRANSACTIONS_ERROR':
      return {
        ...state,
        error: action.error
      }

    case 'INCREMENT_BUDGET':
      var newBudget = state.budgets;
      var newBudgetTotal = state.totalBudget;
      newBudget[action.index]['goalvalue'] = newBudget[action.index]['goalvalue'] + 10;
      newBudgetTotal = newBudgetTotal + 10;
      return {
        ...state,
        budgets: newBudget,
        totalBudget: newBudgetTotal
      };

    case 'DECREMENT_BUDGET':
      var newBudget = state.budgets;
      var newBudgetTotal = state.totalBudget;
      newBudget[action.index]['goalvalue'] = newBudget[action.index]['goalvalue'] - 10;
      newBudgetTotal = newBudgetTotal - 10;
      return {
        ...state,
        budgets: newBudget,
        totalBudget: newBudgetTotal
      };

    default:
      return state;
  }
};

export default budget;