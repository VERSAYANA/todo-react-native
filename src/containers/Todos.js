import { connect } from "react-redux";
import { gql, graphql, compose } from 'react-apollo';
import TodosComponent from "../components/TodosComponent";

const NewTodo = gql`mutation CreateTodo($text: String!, $listId: ID!) {
  createTodo(text: $text, listId: $listId){
    text
		id
  }
}`

const MyQuery = gql`query MyTodoes($id: ID!) {
  List(id: $id) {
    todoes {
      text
    }
  }
}`;


const gifID = (props) => {
	console.log(props.navigation.state.params.id);
	return props.navigation.state.params.id
}

const mapStateToProps = (state, props) => ({
  filter: state.filter,
	id: props.navigation.state.params.id
});


const mapDispatchToProps = {
  toggleFilter: () => ({
    type: "TOGGLE_FILTER"
  })
};

export default compose(
  graphql(MyQuery, {
		options: (props) => ({
			variables: {
				id: props.navigation.state.params.id
			},
		}),
	}),
	graphql(NewTodo, {
		name: 'newTodo',
		options: {
			updateQueries: {
				MyTodoes: (previousData, { mutationResult }) => {
					const newTodo = mutationResult.data.createTodo;
					return {
						...previousData,
						List: {
							...previousData.List,
							todoes: [...previousData.List.todoes,newTodo]
						}
					};
				},
			},
		}
	}),
  connect(mapStateToProps, mapDispatchToProps)
)(TodosComponent);
