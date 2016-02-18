package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="kelas")
public class Kelas {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@NotNull
	@Column(name="tingkat")
	private Integer tingkat;
	
	@NotBlank
	@Column(name="grup_kelas")
	private String grupKelas;
	
	@NotBlank
	@Column(name="jurusan")
	private String jurusan;
	
	@ManyToOne
	@JoinColumn(name="sekolah_id", referencedColumnName="id")
	private Sekolah sekolah;
	
	@ManyToOne
	@JoinColumn(name="tahun_ajaran_id", referencedColumnName="id")
	private TahunAjaran tahunAjaran;
	
	@OneToOne
	@JoinColumn(name="wali_kelas_id", referencedColumnName="id")
	private Guru waliKelas;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public String getJurusan() {
		return jurusan;
	}

	public void setJurusan(String jurusan) {
		this.jurusan = jurusan;
	}

	public Sekolah getSekolah() {
		return sekolah;
	}

	public void setSekolah(Sekolah sekolah) {
		this.sekolah = sekolah;
	}

	public TahunAjaran getTahunAjaran() {
		return tahunAjaran;
	}

	public void setTahunAjaran(TahunAjaran tahunAjaran) {
		this.tahunAjaran = tahunAjaran;
	}

	public Guru getWaliKelas() {
		return waliKelas;
	}

	public void setWaliKelas(Guru waliKelas) {
		this.waliKelas = waliKelas;
	}
	
}
