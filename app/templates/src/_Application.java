// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
package <%= packageName %>;

import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;
import com.robotoworks.mechanoid.Mechanoid;

import android.app.Application;

public class <%= className %>Application extends Application {

	public static final String TAG = "<%= className %>";
	public static final DisplayImageOptions defaultDisplayImageOptions = new DisplayImageOptions.Builder()
			.cacheInMemory(true).cacheOnDisc(true).build();

	@Override
	public void onCreate() {
		super.onCreate();

		Mechanoid.init(this);
		
		ImageLoader.getInstance().init(
				new ImageLoaderConfiguration.Builder(this)
						.defaultDisplayImageOptions(defaultDisplayImageOptions)
						.build());
	}
	
}