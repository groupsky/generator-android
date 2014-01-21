// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
package <%= packageName %>;

<% if(libsToInclude.imageLoader) { %>		
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;
<% } %>
<% if(libsToInclude.mechanoid) { %>		
import com.robotoworks.mechanoid.Mechanoid;
<% } %>

import android.app.Application;

public class <%= className %>Application extends Application {

	public static final String TAG = "<%= className %>";
	<% if(libsToInclude.imageLoader) { %>
	public static final DisplayImageOptions defaultDisplayImageOptions = new DisplayImageOptions.Builder()
			.cacheInMemory(true).cacheOnDisc(true).build();
	<% } %>
	@Override
	public void onCreate() {
		super.onCreate();
		<% if(libsToInclude.mechanoid) { %>		
		Mechanoid.init(this);
		<% } %>

		<% if(libsToInclude.imageLoader) {%>
		ImageLoader.getInstance().init(
				new ImageLoaderConfiguration.Builder(this)
						.defaultDisplayImageOptions(defaultDisplayImageOptions)
						.build());
		<% } %>
	}
	
}