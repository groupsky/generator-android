import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.Robolectric;
import org.robolectric.RobolectricGradleTestRunner;

import android.app.Activity;

@RunWith(RobolectricGradleTestRunner.class)
public class WorkingTest {

	private Activity activity;

	@Before
	public void setup() {
		this.activity = Robolectric.buildActivity(Activity.class).create().get();
	}
	
	@Test
	public void shouldExists() {
		Assert.assertNotNull(this);
	}
	
	@Test
	public void shouldHaveActivity() {
		Assert.assertNotNull(activity);
	}
}
