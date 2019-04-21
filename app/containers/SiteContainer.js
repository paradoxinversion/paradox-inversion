import { Container } from "unstated";

class SiteContainer extends Container {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      test: "test"
    };
  }

  setPages(pages) {
    this.setState({
      pages: pages
    });
  }
}

export default new SiteContainer();
