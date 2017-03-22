import { connect } from "react-redux";
import TodosComponent from "../components/TodosComponent";

const mapStateToProps = (state, props) => ({
  filter: state.filter,
});

const MyQuery = gql`query {
  List(id: $id) {
    todoes {
      text
    }
  }
}`;

const mapStateToProps = (state, props) => ({
  filter: state.filter,
});


const mapDispatchToProps = {
  toggleFilter: () => ({
    type: "TOGGLE_FILTER"
  })
};

export default compose(
  graphql(MyQuery, {
		options: (props) => ({
			
		})
	}),
  connect(mapStateToProps, mapDispatchToProps)
)(ListComponent);
