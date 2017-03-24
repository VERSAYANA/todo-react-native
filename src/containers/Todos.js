import { connect } from "react-redux";
import { gql, graphql, compose } from 'react-apollo';
import TodosComponent from "../components/TodosComponent";

const NewTodo = gql`mutation CreateTodo($text: String!, listId: ID!) {
  createTodo(text: $text, id: $id){
    text
		id
  }
}`

const MyQuery = gql`query MyList($id: ID!) {
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
	graphql(NewTodo)
  connect(mapStateToProps, mapDispatchToProps)
)(TodosComponent);
