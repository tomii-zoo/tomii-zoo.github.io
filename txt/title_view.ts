
function log(msg: any) {
	console.log(msg);
}

class TitleView {
  private m_SelectedMenu = -1;
  private m_IsEnd = false;

  private c_MenuStart = 0;
  private c_MenuConfig = 1;
  private c_MenuExit = 2;
  private c_Msg = "Menus: start(0), config(1), exit(2)";

  /**
   * select menu
   */
  public Update() {
	const input = window.prompt(this.c_Msg);
	this.m_SelectedMenu = Number(input);

	if (this.m_SelectedMenu == this.c_MenuStart) {
		log("start");
	}
	else if (this.m_SelectedMenu == this.c_MenuConfig) {
		log("config");
	}
	else if (this.m_SelectedMenu == this.c_MenuExit) {
		log("exit");
	}
  }

  public IsEnd() : boolean {
	return this.c_MenuStart <= this.m_SelectedMenu
	    && this.m_SelectedMenu <= this.c_MenuExit;
  }
}

const view = new TitleView();
while (!view.IsEnd()) {
	view.Update();
}
