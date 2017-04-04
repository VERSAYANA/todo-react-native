import { connect } from "react-redux";
import { gql, graphql, compose } from 'react-apollo';
import TodosComponent from "../components/TodosComponent";

const NewTodo = gql`mutation CreateTodo($text: String!, $listId: ID!) {
  createTodo(text: $text, listId: $listId){
    text
		completed
		id
  }
}`

const Complete = gql`mutation Complete($id: ID!, $completed: Boolean!) {
  updateTodo(id: $id, completed: $completed){
		text
		completed
		id
  }
}`

const MyQuery = gql`query MyTodoes($id: ID!) {
  List(id: $id) {
    notCompleted: todoes(filter: {completed: false}) {
      text
			completed
			id
    }
		completed: todoes(filter: {completed: true}) {
			text
			completed
			id
		}
  }
}`;



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
							notCompleted: [...previousData.List.notCompleted,newTodo],
						},
					};
				},
			},
		}
	}),
	graphql(Complete, {
		name: 'completeTodo',
		options: {
			updateQueries: {
				MyTodoes: (previousData, { mutationResult }) => {
					const changeTodo = mutationResult.data.updateTodo;
					if (!mutationResult.data.updateTodo.completed) {
						return {
							...previousData,
							List: {
								...previousData.List,
								completed: previousData.List.completed.filter(t => t.id !== changeTodo.id),
								notCompleted: [...previousData.List.notCompleted,changeTodo]
							},
						};
					} if (mutationResult.data.updateTodo.completed) {
						return {
							...previousData,
							List: {
								...previousData.List,
								notCompleted: previousData.List.notCompleted.filter(t => t.id !== changeTodo.id),
								completed: [...previousData.List.completed,changeTodo]
							},
						};
					}
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
