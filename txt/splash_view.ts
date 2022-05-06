
function log(msg: any) {
	console.log(msg);
}

class SplashView {
  private m_Step = 0;
  private m_Frame = 0;
  private m_IsEnd = false;

  private c_WaitFrame = 10000;
  private c_FadeIn = 0;
  private c_Wait = 1;
  private c_FadeOut = 2;
  private c_Exit = 3;

  /**
   * splash animation
   */
  public Update() {
	this.m_Frame++;

	if (this.m_Step == this.c_FadeIn) {
		log(this.m_Frame);
		if (this.m_Frame >= this.c_WaitFrame) {
			this.m_Frame = 0;
			this.m_Step = this.c_Wait;
		}
		return;
	}

	if (this.m_Step == this.c_Wait) {
		log("WAIT...");
		if (this.m_Frame >= this.c_WaitFrame) {
			this.m_Frame = 0;
			this.m_Step = this.c_FadeOut;
		}
		return;
	}

	if (this.m_Step == this.c_FadeOut) {
		log(this.m_Frame);
		if (this.m_Frame >= this.c_WaitFrame) {
			this.m_Frame = 0;
			this.m_Step = this.c_Exit;
		}
		return;
	}
  }

  public IsEnd() : boolean {
	return this.m_Step == this.c_Exit;
  }
}


const view = new SplashView();
while (!view.IsEnd()) {
	view.Update();
}
