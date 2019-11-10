import { Container } from "unstated";

class SiteContainer extends Container {
  constructor(props) {
    super(props);
    this.state = {
      pages: []
    };
  }

  async setPages(pages) {
    await this.setState({
      pages: pages
    });
  }
}

export default new SiteContainer();
