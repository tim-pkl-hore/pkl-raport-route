package id.pkl.raport.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name="guru_mengajar_mata_pelajaran")
public class GuruMengajarMataPelajaran{
	
	@EmbeddedId
	@AttributeOverrides({
		@AttributeOverride(name="guru_id", column= @Column(name="guru_id", nullable = false)),
		@AttributeOverride(name="mata_pelajaran_id", column = @Column(name = "mata_pelajaran_id", nullable = false))
	})
	private GuruMengajarMataPelajaraId id;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="guru_id", updatable=false, insertable=false)
	private Guru guru;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="mata_pelajaran_id", updatable=false, insertable=false)
	private MataPelajaran mataPelajaran;

	public GuruMengajarMataPelajaraId getId() {
		return id;
	}

	public void setId(GuruMengajarMataPelajaraId id) {
		this.id = id;
	}

	public Guru getGuru() {
		return guru;
	}

	public void setGuru(Guru guru) {
		this.guru = guru;
	}

	public MataPelajaran getMataPelajaran() {
		return mataPelajaran;
	}

	public void setMataPelajaran(MataPelajaran mataPelajaran) {
		this.mataPelajaran = mataPelajaran;
	}
	
	
	
	
	
	
}
