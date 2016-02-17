package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="kelas_siswa")
public class KelasSiswa {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Integer id;
	
	@NotNull
	@Column(name="tingkat")
	private Integer tingkat;
	
	@NotBlank
	@Column(name="grup_kelas")
	private String grupKelas;
	
	@ManyToOne
	@JoinColumn(name="tahun_ajaran_id", referencedColumnName="id")
	private TahunAjaran tahunAjaran;
	
	@ManyToOne
	@JoinColumn(name="siswa_id", referencedColumnName="id")
	private Siswa siswa;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getTingkat() {
		return tingkat;
	}

	public void setTingkat(Integer tingkat) {
		this.tingkat = tingkat;
	}

	public String getGrupKelas() {
		return grupKelas;
	}

	public void setGrupKelas(String grupKelas) {
		this.grupKelas = grupKelas;
	}

	public TahunAjaran getTahunAjaran() {
		return tahunAjaran;
	}

	public void setTahunAjaran(TahunAjaran tahunAjaran) {
		this.tahunAjaran = tahunAjaran;
	}

	public Siswa getSiswa() {
		return siswa;
	}

	public void setSiswa(Siswa siswa) {
		this.siswa = siswa;
	}
}
